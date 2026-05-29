/* ------------------------------------------------------------------
 * career-friction-engine.js
 *
 * The Career Friction & Alignment Audit — pure math, no DOM.
 *
 * Four 0–100 self-report inputs:
 *   1. coreValuesConflict   (0 = aligned, 100 = constant suppression)
 *   2. energyROI            (0 = drained, 100 = energised)
 *   3. skillAutonomy        (0 = none, 100 = full creative leverage)
 *   4. secondOrderOutlook   (0 = grim, 100 = exciting in 3 years)
 *
 * Reduces to two axes:
 *   ALIGNMENT  = mean(skillAutonomy, secondOrderOutlook)            0..100
 *   FRICTION   = mean(coreValuesConflict, 100 - energyROI)          0..100
 *
 * Quadrants:
 *   High A + Low F  → Aligned & Flowing
 *   High A + High F → Hard but Right
 *   Low A  + Low F  → Comfortable Drift
 *   Low A  + High F → Golden Handcuffs
 *
 * Exposed via window.CareerFrictionEngine and module.exports.
 * ------------------------------------------------------------------ */

(function (root) {
  'use strict';

  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }
  function n(v) { return clamp(Number(v) || 0, 0, 100); }

  // ---- Quadrant catalogue ----------------------------------------
  // For each quadrant we keep:
  //   id, title, headline, subhead (always shown),
  //   stayingCosts[] and runwayRequired[] (gated payload).
  var QUADRANTS = {
    aligned_flowing: {
      id: 'aligned_flowing',
      title: 'Aligned & Flowing',
      headline: 'High Alignment, Low Friction',
      subhead:
        'You are in the right room. The work fits who you are and who you are becoming, and the ' +
        'cost of doing it is proportional to what you get back. The job here is not to leave — it is ' +
        'to deepen and protect what is working.',
      stayingCosts: [
        'Complacency drift: high-alignment seats lose their edge if you stop investing in your craft.',
        'Identity over-fusion: when "this is who I am" hardens, optionality quietly disappears.',
        'Under-pricing your value because the work feels easy to you.',
        'Allowing scope creep that erodes the very autonomy that makes this work.',
        'Burnout-by-meaning: high-alignment roles are the easiest place to overgive.'
      ],
      runwayRequired: [
        'No transition needed. Re-investment is the move: a learning budget, a new edge, a mentor.',
        'Negotiate forward — alignment is leverage. Use it to widen scope and pricing.',
        'Build a 6-month visible-output plan: writing, talks, or product that compounds your moat.',
        'Quarterly identity audit — make sure the role still fits the person you are becoming.'
      ]
    },
    hard_but_right: {
      id: 'hard_but_right',
      title: 'Hard but Right',
      headline: 'High Alignment, High Friction',
      subhead:
        'The work is the right work — but the system around it is taxing you. This quadrant is often ' +
        'misread as "I should leave"; almost always, the real move is to redesign the conditions, ' +
        'not the destination.',
      stayingCosts: [
        'Conflating "this is hard" with "this is wrong" — and quitting the right thing for the wrong reason.',
        'Physical and emotional fatigue compounding into a decision you wouldn\'t make rested.',
        'Resentment building toward people who are not the actual problem (manager, partner, peers).',
        'Loss of patience for the long arc of mastery this role would actually reward.',
        'Underselling the role to others, which closes doors you may want open later.'
      ],
      runwayRequired: [
        'Map the friction sources first — are they structural (org, role) or operational (your systems)?',
        'A 60-day operating-system rebuild often resolves 70% of perceived "career problem".',
        'One frank conversation with your manager about scope, boundaries, or rhythm before any exit thinking.',
        'A coach or thinking partner — this quadrant is the easiest to misdiagnose alone.',
        'If you must exit: 6–9 months of preparation, with the alignment intact, gets a far better next seat.'
      ]
    },
    comfortable_drift: {
      id: 'comfortable_drift',
      title: 'Comfortable Drift',
      headline: 'Low Alignment, Low Friction',
      subhead:
        'Nothing hurts. Nothing means much either. This is the quietest quadrant and the most expensive — ' +
        'the cost is paid in compounding years, not in daily pain.',
      stayingCosts: [
        'Loss of agency: low friction trains you to stop choosing.',
        'Atrophied taste — without challenge, your sense of what you actually want fades.',
        'A future "what was I doing?" reckoning that arrives in your 40s with interest.',
        'Quiet identity erosion — the gap between who you are and who you appear to be widens.',
        'Lost compounding: skills that don\'t stretch don\'t scale.'
      ],
      runwayRequired: [
        'Re-introduce friction on purpose: a side project, a stretch assignment, a public commitment.',
        'A 90-day exploration phase before any transition — drift quadrants need data, not impulse.',
        'Talk to people in 3 adjacent fields. Notice which ones light you up — that\'s signal.',
        'Build a 6–12 month financial runway before any move (see also: clearhead.in/runway).',
        'Coaching here is most useful for surfacing the values you have, quietly, stopped naming.'
      ]
    },
    golden_handcuffs: {
      id: 'golden_handcuffs',
      title: 'Golden Handcuffs',
      headline: 'Low Alignment, High Friction',
      subhead:
        'The work neither fits who you are nor pays you back in energy — and yet leaving feels ' +
        'expensive. The handcuffs are real (comp, status, sunk identity), and the cost of keeping ' +
        'them on is also real, just less visible.',
      stayingCosts: [
        'Identity calcification — three more years in a misaligned seat is rarely "just three years".',
        'Relational drift: the people you love absorb the cost of an energy-negative job.',
        'Health compounding — chronic friction is paid biologically before it is paid financially.',
        'The "golden" part inflates with each promotion, making exit harder, not easier.',
        'Future-you inherits a narrower set of options the longer you wait to choose.'
      ],
      runwayRequired: [
        '9–18 months of disciplined preparation, not a "burn the boats" move.',
        'A clear financial runway: 12+ months of expenses uncoupled from this role.',
        'A pre-transition identity rebuild — who you are when the role is no longer the answer.',
        'A skills bridge: the next seat does not exist yet; you build it in the evenings of this one.',
        'A coaching arrangement that holds the long arc — most exits fail in month 4, not month 1.'
      ]
    }
  };

  function quadrantFor(alignment, friction) {
    var hiA = alignment >= 50;
    var hiF = friction  >= 50;
    if (hiA && !hiF) return QUADRANTS.aligned_flowing;
    if (hiA &&  hiF) return QUADRANTS.hard_but_right;
    if (!hiA && !hiF) return QUADRANTS.comfortable_drift;
    return QUADRANTS.golden_handcuffs;
  }

  // ----------------------------------------------------------------
  // compute(input) → { alignment, friction, quadrant, diagnosis, tone }
  // ----------------------------------------------------------------
  function compute(input) {
    input = input || {};
    var values   = n(input.coreValuesConflict);
    var roi      = n(input.energyROI);
    var autonomy = n(input.skillAutonomy);
    var outlook  = n(input.secondOrderOutlook);

    var alignment = Math.round((autonomy + outlook) / 2);
    var friction  = Math.round((values + (100 - roi)) / 2);

    var q = quadrantFor(alignment, friction);

    var diagnosis =
      q.headline + ' · ' + q.title + '. ' +
      'Alignment score ' + alignment + ' / 100. Friction score ' + friction + ' / 100.';

    // Tone for visual emphasis (matches the rw-* / tk-* tone tokens):
    //   critical = staying compounds the cost
    //   tight    = real friction, recoverable
    //   stable   = working but worth deepening
    //   strong   = aligned and flowing
    var tone;
    if (q.id === 'golden_handcuffs') tone = 'critical';
    else if (q.id === 'hard_but_right') tone = 'tight';
    else if (q.id === 'comfortable_drift') tone = 'tight';
    else tone = 'strong';

    return {
      alignment: alignment,
      friction: friction,
      quadrant: q,
      diagnosis: diagnosis,
      tone: tone,
      axes: {
        coreValuesConflict: values,
        energyROI: roi,
        skillAutonomy: autonomy,
        secondOrderOutlook: outlook
      }
    };
  }

  var api = {
    compute: compute,
    QUADRANTS: QUADRANTS,
    quadrantFor: quadrantFor
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.CareerFrictionEngine = api;
  }
})(typeof window !== 'undefined' ? window : this);
