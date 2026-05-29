/* ------------------------------------------------------------------
 * runway-engine.js
 *
 * The Abundance Runway Calculator — pure math, no DOM.
 *
 * One job: given a person's snapshot (age, dependents, assets, monthly
 * spend) return how many months they could keep their life running if
 * the paycheque stopped today — and how much that number changes when
 * they pull common levers (cut variable spend, liquidate illiquid
 * assets, drop fixed EMIs).
 *
 * Decoupled by design. No globals, no UI calls. Exports via
 * window.RunwayEngine (browser) and module.exports (node tests).
 * ------------------------------------------------------------------ */

(function (root) {
  'use strict';

  // -------- Defaults -----------------------------------------------
  // Conservative India-centric defaults. Tweakable per call.
  var DEFAULTS = {
    inflationAnnual: 0.06,       // 6% — RBI-ish urban inflation
    returnLiquidAnnual: 0.08,    // 8% — blended return on liquid corpus
    illiquidHaircut: 0.20,       // 20% haircut on rushed liquidation
    maxMonths: 600               // safety cap (50 years) — abundance
  };

  // -------- Medical buffer -----------------------------------------
  // A small one-time deduction from liquid assets to acknowledge that
  // a hospitalisation or family medical event is the most common reason
  // a runway evaporates. Scales with age and dependents.
  function medicalBuffer(age, dependents) {
    age = Math.max(18, Math.min(80, Number(age) || 30));
    dependents = Math.max(0, Math.min(10, Number(dependents) || 0));

    // Base: ₹2 lakh for a healthy 30-year-old
    var base = 200000;

    // Age multiplier — ramps up after 40
    var ageFactor = 1 + Math.max(0, (age - 30)) * 0.04;

    // Dependents — each adds ~₹1.5 lakh of expected exposure
    var depFactor = 1 + dependents * 0.75;

    return Math.round(base * ageFactor * depFactor);
  }

  // -------- Core runway sim ----------------------------------------
  // Month-by-month simulation. Each month:
  //   1. Liquid corpus earns 1/12 of annual return (compounding).
  //   2. We withdraw that month's expenses.
  //   3. Expenses inflate at 1/12 of annual inflation rate.
  // Runway = number of full months survived before corpus goes ≤ 0.
  function simulate(snapshot, opts) {
    opts = opts || {};
    var inflation = opts.inflationAnnual != null ? opts.inflationAnnual : DEFAULTS.inflationAnnual;
    var ret       = opts.returnLiquidAnnual != null ? opts.returnLiquidAnnual : DEFAULTS.returnLiquidAnnual;
    var cap       = opts.maxMonths || DEFAULTS.maxMonths;

    var monthlyInflation = Math.pow(1 + inflation, 1 / 12) - 1;
    var monthlyReturn    = Math.pow(1 + ret,       1 / 12) - 1;

    var corpus = Math.max(0, Number(snapshot.liquidAssets) || 0);
    var fixed  = Math.max(0, Number(snapshot.fixedMonthly)   || 0);
    var varbl  = Math.max(0, Number(snapshot.variableMonthly) || 0);

    // Apply medical buffer up-front (emergency reserve)
    var buffer = medicalBuffer(snapshot.age, snapshot.dependents);
    // Apply pending tax liability up-front (money already owed, not available)
    // e.g. outstanding income tax demand, GST arrears
    var taxLiab = Math.max(0, Number(snapshot.pendingTaxLiability) || 0);
    corpus = Math.max(0, corpus - buffer - taxLiab);

    var months = 0;
    var trajectory = [{ month: 0, corpus: corpus, monthlySpend: fixed + varbl }];

    // Degenerate case: no spend at all → runway is effectively infinite.
    if (fixed + varbl <= 0) {
      return finish(cap, [
        { month: 0,   corpus: corpus, monthlySpend: 0 },
        { month: cap, corpus: corpus, monthlySpend: 0 }
      ], buffer, taxLiab);
    }

    for (var i = 1; i <= cap; i++) {
      // grow what's left
      corpus = corpus * (1 + monthlyReturn);

      // monthly expense for this month (after i-1 months of inflation)
      var spend = (fixed + varbl) * Math.pow(1 + monthlyInflation, i - 1);

      // withdraw
      corpus -= spend;

      if (corpus <= 0) {
        // partial month — count fractional progress
        var fraction = (corpus + spend) / spend; // how much of this month we covered
        months = (i - 1) + Math.max(0, Math.min(1, fraction));
        trajectory.push({ month: i, corpus: 0, monthlySpend: spend });
        return finish(months, trajectory, buffer, taxLiab);
      }

      months = i;
      // sample the trajectory sparsely so the chart stays light
      if (i % 3 === 0 || i <= 12) {
        trajectory.push({ month: i, corpus: Math.round(corpus), monthlySpend: Math.round(spend) });
      }
    }

    return finish(months, trajectory, buffer, taxLiab);
  }

  function finish(months, trajectory, buffer, taxLiab) {
    return {
      months: Math.round(months * 10) / 10,
      monthsWhole: Math.floor(months),
      trajectory: trajectory,
      medicalBufferApplied: buffer,
      taxLiabilityApplied: taxLiab || 0
    };
  }

  // -------- Quick "headline" runway --------------------------------
  // The number we show on the aha-moment screen.
  function calculateRunway(snapshot, opts) {
    var sim = simulate(snapshot, opts);
    return {
      months:               sim.months,
      monthsWhole:          sim.monthsWhole,
      capped:               sim.months >= (opts && opts.maxMonths ? opts.maxMonths : DEFAULTS.maxMonths) - 1,
      buffer:               sim.medicalBufferApplied,
      taxLiabilityApplied:  sim.taxLiabilityApplied,
      trajectory:           sim.trajectory
    };
  }

  // -------- Lever recalculation ------------------------------------
  // Apply one or more behavioural levers to a snapshot and return
  // the new runway. Pure — does not mutate input.
  //
  // Available levers (any subset):
  //   { cutVariablePct:   0.20 }   // shave 20% off variable spend
  //   { liquidateIlliquidPct: 0.30 } // turn 30% of illiquid into liquid (after haircut)
  //   { eliminateEmi:    amount }  // drop this much from fixed monthly
  //   { cutFixedPct:     0.10 }    // generic fixed cut
  function applyLevers(snapshot, levers, opts) {
    levers = levers || {};
    var s = {
      age:                  snapshot.age,
      dependents:           snapshot.dependents,
      liquidAssets:         Number(snapshot.liquidAssets)         || 0,
      illiquidAssets:       Number(snapshot.illiquidAssets)       || 0,
      fixedMonthly:         Number(snapshot.fixedMonthly)         || 0,
      variableMonthly:      Number(snapshot.variableMonthly)      || 0,
      pendingTaxLiability:  Number(snapshot.pendingTaxLiability)  || 0
    };

    if (levers.cutVariablePct) {
      s.variableMonthly = s.variableMonthly * (1 - levers.cutVariablePct);
    }
    if (levers.cutFixedPct) {
      s.fixedMonthly = s.fixedMonthly * (1 - levers.cutFixedPct);
    }
    if (levers.eliminateEmi) {
      s.fixedMonthly = Math.max(0, s.fixedMonthly - levers.eliminateEmi);
    }
    if (levers.liquidateIlliquidPct) {
      var haircut = opts && opts.illiquidHaircut != null ? opts.illiquidHaircut : DEFAULTS.illiquidHaircut;
      var freed = s.illiquidAssets * levers.liquidateIlliquidPct * (1 - haircut);
      s.liquidAssets   += freed;
      s.illiquidAssets -= s.illiquidAssets * levers.liquidateIlliquidPct;
    }

    return calculateRunway(s, opts);
  }

  // -------- Tone-of-voice classifier -------------------------------
  // Used by the UI to pick the right copy for the headline.
  //   critical:   < 3 months         (supportive, non-alarmist)
  //   tight:      3–6 months         (clear, motivational)
  //   stable:     6–18 months        (reassuring)
  //   strong:     18+ months         (abundance)
  function tone(months) {
    if (!isFinite(months) || months < 3)  return 'critical';
    if (months < 6)                       return 'tight';
    if (months < 18)                      return 'stable';
    return 'strong';
  }

  // -------- Currency formatter (INR, Indian lakh/crore) ------------
  function formatINR(n) {
    n = Math.round(Number(n) || 0);
    if (Math.abs(n) >= 1e7) return '₹' + (n / 1e7).toFixed(n % 1e7 === 0 ? 0 : 2) + ' Cr';
    if (Math.abs(n) >= 1e5) return '₹' + (n / 1e5).toFixed(n % 1e5 === 0 ? 0 : 2) + ' L';
    return '₹' + n.toLocaleString('en-IN');
  }

  // -------- Public API ---------------------------------------------
  var api = {
    DEFAULTS:        DEFAULTS,
    medicalBuffer:   medicalBuffer,
    simulate:        simulate,
    calculateRunway: calculateRunway,
    applyLevers:     applyLevers,
    tone:            tone,
    formatINR:       formatINR
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.RunwayEngine = api;
}(typeof window !== 'undefined' ? window : globalThis));
