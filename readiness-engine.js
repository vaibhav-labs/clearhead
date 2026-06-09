/* ------------------------------------------------------------------
 * readiness-engine.js
 *
 * The Quit-to-Solo Readiness Index — pure math, no DOM.
 *
 * For anyone considering leaving employment for self-employment,
 * consulting, freelancing, agency, indie product, solo practice, or
 * an entrepreneurial venture. Score yourself across three axes that
 * actually decide outcomes — Clarity, Financial Stability, and Gut.
 *
 * Six 0–100 self-report inputs (two per axis):
 *
 *   CLARITY
 *     1. articulation     — can you state today, in one sentence, who pays
 *                          you, for what, and why now?
 *     2. paidValidation   — in the last 90 days, how many people have
 *                          actually paid you for something close to the offer?
 *
 *   FINANCIAL STABILITY
 *     3. liquidRunway     — how many months of fixed expenses can you cover
 *                          from liquid savings alone? (no credit, no family,
 *                          no asset sale)
 *     4. bridgePlan       — if zero revenue for 18 months, do you have a named,
 *                          funded bridge — not "I'll figure it out"?
 *
 *   GUT TO FACE FAILURE
 *     5. walkBackNarrative — if you had to return to employment in 18 months,
 *                          do you have a frank sentence you'd say out loud
 *                          to a peer?
 *     6. namedFirstCall   — the week your first major bet fails publicly, do
 *                          you have a specific named person to call before
 *                          midnight (not "supportive friends" generically)?
 *
 * Exposed via window.ReadinessEngine and module.exports.
 * ------------------------------------------------------------------ */

(function (root) {
  'use strict';

  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }
  function n(v) { return clamp(Number(v) || 0, 0, 100); }

  // Axis weights — Financial is the historical killer of solo transitions,
  // so it carries the largest weight. Clarity and Gut share the remainder.
  var W = { clarity: 0.30, financial: 0.40, gut: 0.30 };

  var AXES = {
    clarity: {
      name: 'Clarity of idea',
      questions: ['articulation', 'paidValidation']
    },
    financial: {
      name: 'Financial stability',
      questions: ['liquidRunway', 'bridgePlan']
    },
    gut: {
      name: 'Gut to face failure',
      questions: ['walkBackNarrative', 'namedFirstCall']
    }
  };

  // ---- Bands for the overall score ------------------------------------
  // Each band has a headline diagnosis, a tone token (for visual emphasis),
  // and a coaching framing that the unlocked payload uses verbatim. The
  // lower bands lean explicitly into "coaching is the structured way to
  // close this specific gap" because that is the honest read.
  var BANDS = {
    notReady: {
      band: 'notReady',
      tone: 'critical',
      title: 'Not yet ready · do not quit this quarter',
      diagnosisTemplate: function (s) {
        return 'Readiness score ' + s + ' / 100. The honest read: you are in the dreaming phase, ' +
               'not the building phase. Quitting now would convert a high-cost decision into a panic decision.';
      },
      coachingFraming:
        'This is the band where coaching has the highest leverage. Not because you cannot do this — ' +
        'because the gap between "I want out" and "I have a sequenced plan" is exactly the kind of ' +
        'gap that closes inside structured 1:1 conversations, not inside more reading. The work is to ' +
        'turn three vague pulls — clarity, financial bridge, identity-on-failure — into named, dated, ' +
        'sequenced moves. Six to twelve sessions. Most people leave knowing whether they are quitting in ' +
        '12 months, in 24, or not at all — and the answer feels like agency, not anxiety.'
    },
    partial: {
      band: 'partial',
      tone: 'tight',
      title: 'Partial readiness · one axis is the bottleneck',
      diagnosisTemplate: function (s) {
        return 'Readiness score ' + s + ' / 100. You are not in the dreaming phase, but you also are ' +
               'not in the executing phase. One specific axis is doing more damage than you think.';
      },
      coachingFraming:
        'This is the most common — and most dangerous — band. You feel ready because two of three ' +
        'axes are in decent shape, which makes it easy to ignore the third. Almost every solo transition ' +
        'that fails in months 4–9 fails because the weakest axis was visible at the start and minimised. ' +
        'Coaching here is single-issue: name the gap, build the specific 90-day work to close it, ' +
        'then move.'
    },
    realReadiness: {
      band: 'realReadiness',
      tone: 'stable',
      title: 'Real readiness · sequence and move',
      diagnosisTemplate: function (s) {
        return 'Readiness score ' + s + ' / 100. You have done the unsexy work most people skip. ' +
               'The remaining question is not "should I" — it is "in what sequence."';
      },
      coachingFraming:
        'You do not need permission. What you may benefit from is sequencing — the order in which ' +
        'you reduce risk, give notice, switch to revenue, and rebuild identity. Coaching for this ' +
        'band is short and tactical: a few sessions to pressure-test the plan and the calendar.'
    },
    fullReadiness: {
      band: 'fullReadiness',
      tone: 'strong',
      title: 'Fully ready · the only question is timing',
      diagnosisTemplate: function (s) {
        return 'Readiness score ' + s + ' / 100. Clarity, runway, and the psychological readiness for ' +
               'failure are all real. The next move is execution, not preparation.';
      },
      coachingFraming:
        'You are past the readiness question. The work shifts: from "am I ready" to "how do I scale ' +
        'this without losing what made it work?" Coaching here is about the second curve — when to ' +
        'hire, when to say no, what to defend, and how to keep the work you actually came for from ' +
        'being eaten by the company you built.'
    }
  };

  function bandFor(score) {
    if (score < 30) return BANDS.notReady;
    if (score < 60) return BANDS.partial;
    if (score < 80) return BANDS.realReadiness;
    return BANDS.fullReadiness;
  }

  // ---- Gap prescriptions ----------------------------------------------
  // For each axis, given the axis score, the unlocked payload renders a
  // specific 90-day move. These are deliberately concrete — the lock is on
  // depth, not on platitudes.
  var GAP_MOVES = {
    clarity: {
      severe:
        'Run 25 paid validation conversations in 30 days. Not "would you use this" — actually charge ' +
        'something, even a token amount, for a one-hour version of the offer. The clarity arrives ' +
        'through the wallet, not through more thinking.',
      moderate:
        'Write your one-line offer on a card. Read it out loud to 10 specific people in your target ' +
        'segment over 30 days. Refine after each. The card is done when you can say it without flinching.',
      light:
        'Pressure-test the offer on three people who would NOT obviously buy. Their questions reveal ' +
        'the weakest seam in your positioning faster than any aligned customer can.'
    },
    financial: {
      severe:
        'Do not quit this year. Build a 12-month liquid runway (see also: clearhead.in/runway). Half of ' +
        '"failed" ventures are financial timing failures wearing a strategy costume.',
      moderate:
        'Define the bridge in writing: how many months at zero revenue, funded by what specifically. ' +
        'If the answer involves "I will figure it out" — keep the job until it does not.',
      light:
        'Stress-test the runway against a 50% slower ramp than your base case. If the answer still works, ' +
        'go. If it does not, you are not yet financially ready — you are financially hopeful.'
    },
    gut: {
      severe:
        'Sit with the failure scenario explicitly. Write the 18-month walk-back. Name the first person ' +
        'you would call the week your first public bet flops. Until those two artefacts exist, the gut ' +
        'is theoretical.',
      moderate:
        'Have ONE conversation with someone who has visibly failed in their own venture and returned to ' +
        'employment. Ask them what surprised them. The answer reshapes your readiness more than 50 ' +
        'success podcasts will.',
      light:
        'Build a small failure ritual now — a quarterly "if this stops working" review. Most solo ' +
        'careers compound not because failure does not happen, but because the operator has a system ' +
        'for metabolising it before identity calcifies.'
    }
  };

  function severityFor(axisScore) {
    if (axisScore < 35) return 'severe';
    if (axisScore < 65) return 'moderate';
    return 'light';
  }

  // ---- compute(input) -------------------------------------------------
  // input: object with keys matching question names above, each 0..100
  // returns: { score, band, diagnosis, tone, axes: [...], dominantGap }
  function compute(input) {
    input = input || {};

    var perAxis = Object.keys(AXES).map(function (key) {
      var axis = AXES[key];
      var values = axis.questions.map(function (q) { return n(input[q]); });
      var raw = values.reduce(function (a, b) { return a + b; }, 0) / values.length;
      var score = Math.round(raw);
      return {
        key: key,
        name: axis.name,
        score: score,
        weight: W[key],
        severity: severityFor(score),
        gapMove: GAP_MOVES[key][severityFor(score)],
        questionScores: values.map(function (v, i) {
          return { question: axis.questions[i], score: Math.round(v) };
        })
      };
    });

    var weighted = perAxis.reduce(function (sum, a) {
      return sum + a.score * a.weight;
    }, 0);
    var score = clamp(Math.round(weighted), 0, 100);

    var band = bandFor(score);

    // Dominant gap = the axis pulling the most weight downward.
    // We score each axis by (weight × (100 - score)) — i.e. how much
    // upside is locked behind closing it. Highest value wins.
    var dominantGap = perAxis.slice().sort(function (a, b) {
      return (b.weight * (100 - b.score)) - (a.weight * (100 - a.score));
    })[0];

    return {
      score: score,
      band: band.band,
      tone: band.tone,
      title: band.title,
      diagnosis: band.diagnosisTemplate(score),
      coachingFraming: band.coachingFraming,
      axes: perAxis,
      dominantGap: dominantGap,
      inputs: {
        articulation:        n(input.articulation),
        paidValidation:      n(input.paidValidation),
        liquidRunway:        n(input.liquidRunway),
        bridgePlan:          n(input.bridgePlan),
        walkBackNarrative:   n(input.walkBackNarrative),
        namedFirstCall:      n(input.namedFirstCall)
      }
    };
  }

  var api = {
    compute: compute,
    AXES: AXES,
    BANDS: BANDS,
    bandFor: bandFor
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.ReadinessEngine = api;
  }
})(typeof window !== 'undefined' ? window : this);
