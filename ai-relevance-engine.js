/* ------------------------------------------------------------------
 * ai-relevance-engine.js
 *
 * The AI Automation & Relevance Index — pure math, no DOM.
 *
 * Four 0–100 self-report inputs:
 *   1. taskRoutinization      (0 = open-ended, 100 = rule-based playbook)
 *   2. interpersonalDependency(0 = solo, 100 = high trust/empathy/negotiation)
 *   3. processAmbiguity       (0 = paint-by-numbers, 100 = first principles)
 *   4. digitalVsPhysical      (0 = physical world, 100 = entirely digital)
 *
 * "Exposure" is how replaceable the EXECUTION layer of the role is.
 * "Strategic value" is what AI cannot automate: judgment, presence,
 * negotiation, first-principles design. The score talks about exposure
 * only — it does not measure the human's worth.
 *
 * Exposed via window.AIRelevanceEngine and module.exports.
 * ------------------------------------------------------------------ */

(function (root) {
  'use strict';

  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }
  function n(v) { return clamp(Number(v) || 0, 0, 100); }

  // Weights — sum to 1.0
  var W = {
    routine:     0.30, // single biggest exposure signal
    notHuman:    0.25, // inverse of interpersonal dependency
    notAmbig:    0.20, // inverse of process ambiguity
    digital:     0.25
  };

  // ---- Pivot strategies per band -------------------------------------
  // Each band gets: title, validating message (shown unlocked),
  // executor → strategist pivot moves, and a coaching frame.
  var BANDS = {
    high: {
      band: 'high',
      threshold: 60,
      validatingMessage:
        'Your execution skills are highly exposed to automation, but your strategic value is not. ' +
        'The score is not a verdict on you — it is a description of which layer of your current ' +
        'role is most copyable. The work below is moving from that layer up into the one AI cannot ' +
        'reach.',
      title: 'High Exposure · Strategic Pivot Required',
      strategistMoves: [
        'Identify the 20% of your output that requires human judgment, not just human effort — and double down on it visibly.',
        'Stop describing yourself by your tasks ("I do X"). Start describing yourself by your decisions ("I decide when X is the right move").',
        'Build a public artefact (writing, talks, internal docs) that demonstrates your judgment — judgment is the only thing AI cannot copy from you.',
        'Move adjacent to where strategic decisions are made: take on cross-functional scope, partner with leadership, sit on planning conversations.',
        'Develop one deep human-leverage skill: facilitation, negotiation, conflict navigation, or executive coaching. These compound; AI does not.',
        'Audit your daily calendar — if more than 50% is execution tasks AI could replicate, the calendar IS the career risk.'
      ],
      coachingFrame:
        'High-exposure professionals rarely fail because they lack capability — they fail because they ' +
        'cannot SEE their strategic value, so they cannot price it, sell it, or build a role around it. ' +
        '1:1 coaching is the structured environment to make that visible and to install the daily ' +
        'practices that move you from "automatable executor" to "irreplaceable strategist".'
    },
    mid: {
      band: 'mid',
      threshold: 30,
      validatingMessage:
        'Your role sits in the most volatile band — partly automatable, partly not. The next 24 ' +
        'months will sort this band into two cohorts: those who consciously moved up the value ' +
        'stack and those who did not. The work below makes you the former.',
      title: 'Mixed Exposure · Re-Position While You Have Optionality',
      strategistMoves: [
        'Map your role into "execution" vs. "judgment" buckets. Aim to shift 10–20 percentage points toward judgment every quarter.',
        'Adopt AI as a force multiplier on the execution side — not to be a faster executor, but to free time for the higher-order work.',
        'Take on one explicitly ambiguous problem per quarter — the kind that has no playbook. This is how strategic muscle is built.',
        'Make your judgment visible: write the strategy memo, lead the post-mortem, name the trade-off others avoid naming.',
        'Cultivate a 12-month relationship arc with three senior decision-makers in your industry — strategic positioning is partly social capital.',
        'Define one craft you will own at a depth no AI tool can copy in the next 5 years — and invest 5 hours/week in it.'
      ],
      coachingFrame:
        'Mid-band professionals have the most leverage and the smallest window. Coaching here is ' +
        'about deliberate sequencing — which moves to make in what order so the optionality you have ' +
        'today compounds into positioning you can defend in 3 years.'
    },
    low: {
      band: 'low',
      threshold: 0,
      validatingMessage:
        'Your role is already anchored in what AI cannot automate — trust, embodiment, empathy, ' +
        'first-principles judgment. Exposure is low. The risk for you is different: it is not ' +
        'replacement, it is mispricing your own value relative to a market that increasingly can ' +
        'measure it.',
      title: 'Low Exposure · Compound What Is Already Working',
      strategistMoves: [
        'Audit your pricing. Low-exposure work is rapidly re-pricing upward as the market notices what AI cannot do.',
        'Document your method — what you do is increasingly rare, and your method is now an asset others will pay for.',
        'Use AI aggressively to remove your own admin layer so 100% of your time goes to the irreplaceable work.',
        'Consider building one repeatable IP product (a course, a framework, a writing body) that captures your judgment in scalable form.',
        'Mentor — your tacit knowledge is becoming scarcer at exactly the moment more people need it.',
        'Protect deep work — your edge is built in the quiet hours AI will never have a substitute for.'
      ],
      coachingFrame:
        'Low-exposure professionals often under-invest in positioning because the work itself feels ' +
        'secure. Coaching here is about converting that security into compounding — pricing, scope, ' +
        'and the next decade of strategic moves while the market repositions around you.'
    }
  };

  function bandFor(score) {
    if (score >= 60) return BANDS.high;
    if (score >= 30) return BANDS.mid;
    return BANDS.low;
  }

  function toneFor(score) {
    if (score >= 75) return 'critical';
    if (score >= 50) return 'tight';
    if (score >= 25) return 'stable';
    return 'strong';
  }

  function compute(input) {
    input = input || {};
    var routine  = n(input.taskRoutinization);
    var human    = n(input.interpersonalDependency);
    var ambig    = n(input.processAmbiguity);
    var digital  = n(input.digitalVsPhysical);

    var notHuman = 100 - human;
    var notAmbig = 100 - ambig;

    var exposure = (
      routine  * W.routine  +
      notHuman * W.notHuman +
      notAmbig * W.notAmbig +
      digital  * W.digital
    );

    exposure = Math.round(clamp(exposure, 0, 100));

    var band = bandFor(exposure);

    var headline;
    if (exposure >= 75) {
      headline = 'AI Exposure ' + exposure + '%. Your role\'s execution layer is highly copyable — but execution is not your only layer.';
    } else if (exposure >= 50) {
      headline = 'AI Exposure ' + exposure + '%. Significant parts of your role are automatable; significant parts are not. The next 24 months decide which way it tips.';
    } else if (exposure >= 25) {
      headline = 'AI Exposure ' + exposure + '%. Your role still has meaningful human-anchored value. The work is to deepen that anchor before the market re-prices.';
    } else {
      headline = 'AI Exposure ' + exposure + '%. Your role is anchored in what AI cannot automate. The risk is mispricing, not replacement.';
    }

    return {
      exposure: exposure,
      band: band.band,
      headline: headline,
      tone: toneFor(exposure),
      validatingMessage: band.validatingMessage,
      pivotTitle: band.title,
      strategistMoves: band.strategistMoves,
      coachingFrame: band.coachingFrame,
      axes: {
        taskRoutinization:        routine,
        interpersonalDependency:  human,
        processAmbiguity:         ambig,
        digitalVsPhysical:        digital
      }
    };
  }

  var api = {
    compute: compute,
    BANDS: BANDS,
    bandFor: bandFor
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.AIRelevanceEngine = api;
  }
})(typeof window !== 'undefined' ? window : this);
