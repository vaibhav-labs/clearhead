/* ------------------------------------------------------------------
 * bandwidth-engine.js
 *
 * The Cognitive Load & Bandwidth Index — pure math, no DOM.
 *
 * Given four 0–100 self-report scores across:
 *   1. Open Loops          (unmade decisions, pending tasks, boundaries)
 *   2. Context Switching   (interruptions, tabs, pings)
 *   3. System Dependency   (reliance on memory vs. external systems)
 *   4. Recovery Efficiency (sleep quality, true rest vs. passive)
 *
 * Returns:
 *   - bandwidth     (1–99 %)            — reserve capacity
 *   - diagnosis     (string)            — one-sentence frame
 *   - tone          ("critical" | "tight" | "stable" | "strong")
 *   - leaks         (sorted high→low)   — per-axis contribution to drain
 *                                          with a workflow protocol prescription
 *
 * Decoupled by design. No globals, no UI calls. Exports via
 * window.BandwidthEngine (browser) and module.exports (node tests).
 * ------------------------------------------------------------------ */

(function (root) {
  'use strict';

  // ----------------------------------------------------------------
  // Axis definitions
  //
  // Each axis is a 0–100 slider. We normalise so that "higher value =
  // more cognitive drain". For Recovery Efficiency, the raw input is
  // "higher = better recovery", so we invert it before computing drain.
  // ----------------------------------------------------------------
  var AXES = [
    {
      key: 'openLoops',
      name: 'Open Loops',
      weight: 0.30,
      invert: false,
      protocol: {
        high:
          'Run a 25-minute Loop Capture: every unmade decision, pending task, and unspoken ' +
          'boundary out of your head and into a trusted inbox. The Zeigarnik effect stops the ' +
          'moment a loop has a defined next action and a date.',
        mid:
          'Schedule a weekly 15-minute Loop Review. Each open loop must end the review with ' +
          'either a specific next action, a defer date, or a "no" — never a vague "later".',
        low:
          'Your closure discipline is solid. Maintain it with a once-a-quarter audit of long-' +
          'dormant commitments (the loops you carry without naming).'
      }
    },
    {
      key: 'contextSwitching',
      name: 'Context Switching',
      weight: 0.25,
      invert: false,
      protocol: {
        high:
          'Implement the 90/20 protocol: 90-minute closed-loop work blocks with notifications ' +
          'fully off, followed by a 20-minute open window for messages, tabs, and pings. The ' +
          'switching cost is ~23 minutes per interruption — your day cannot absorb that tax.',
        mid:
          'Batch communication into two daily windows (e.g. 11:30 and 16:30). Outside those ' +
          'windows, treat notifications as off. The relationships survive; the work improves.',
        low:
          'You hold attention well. Protect it: every new app, group, or channel is a draw on ' +
          'this capital — say no by default.'
      }
    },
    {
      key: 'systemDependency',
      name: 'System Dependency',
      weight: 0.15,
      invert: false,
      protocol: {
        high:
          'You are using your working memory as a database. Externalise it: one capture tool, ' +
          'one calendar, one task list — non-negotiably trusted. Working memory is ~4 items; ' +
          'everything else needs a home outside your head.',
        mid:
          'Audit your trusted systems. Anywhere you "try to remember", install a tool. The goal ' +
          'is for your mind to be empty by design, not by failure.',
        low:
          'Your external systems are doing their job. Periodically prune them — a system you ' +
          'don\'t fully trust is worse than no system at all.'
      }
    },
    {
      key: 'recoveryEfficiency',
      name: 'Recovery Efficiency',
      weight: 0.30,
      invert: true, // higher raw score = better recovery = less drain
      protocol: {
        high:
          'Recovery is your single highest-ROI lever. Passive consumption (scrolling, ' +
          'streaming) is not rest — it is shallow stimulation that leaves you depleted. Define ' +
          'true rest for your body specifically: sleep, walk, conversation, stillness. Calendar ' +
          'it like you calendar meetings.',
        mid:
          'Tighten your sleep boundary: a fixed lights-out hour matters more than a fixed ' +
          'wake-up hour. Build one no-screen ritual in the 60 minutes before bed.',
        low:
          'Your recovery foundation is intact. Defend it. Almost every other cognitive lever ' +
          'collapses without it.'
      }
    }
  ];

  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }

  function severityFor(drain) {
    if (drain >= 70) return 'high';
    if (drain >= 40) return 'mid';
    return 'low';
  }

  function toneFor(bandwidth) {
    if (bandwidth <= 15) return 'critical';
    if (bandwidth <= 30) return 'critical';
    if (bandwidth <= 50) return 'tight';
    if (bandwidth <= 70) return 'stable';
    return 'strong';
  }

  function diagnosisFor(bandwidth) {
    if (bandwidth <= 15) {
      return 'Your system is currently running on ' + bandwidth +
             '% reserve capacity — operating from depletion, not strategy.';
    }
    if (bandwidth <= 30) {
      return 'Your system has ' + bandwidth +
             '% reserve capacity — execution is happening, but at clear neurological cost.';
    }
    if (bandwidth <= 50) {
      return 'Your system has ' + bandwidth +
             '% reserve capacity — functional, but reactive rather than strategic.';
    }
    if (bandwidth <= 70) {
      return 'Your system has ' + bandwidth +
             '% reserve capacity — stable, with room to think before reacting.';
    }
    return 'Your system has ' + bandwidth +
           '% reserve capacity — clear-headed, with bandwidth to spare for strategic moves.';
  }

  // ----------------------------------------------------------------
  // compute()
  //
  // input: { openLoops, contextSwitching, systemDependency, recoveryEfficiency }
  //        each a number 0..100 (0 = none/best, 100 = worst, EXCEPT
  //        recoveryEfficiency where 100 = best recovery)
  //
  // output: { bandwidth, drain, diagnosis, tone, leaks: [...] }
  // ----------------------------------------------------------------
  function compute(input) {
    input = input || {};

    var perAxis = AXES.map(function (axis) {
      var raw = clamp(Number(input[axis.key]) || 0, 0, 100);
      var drain = axis.invert ? (100 - raw) : raw;
      var contribution = drain * axis.weight; // 0..100 * weight
      return {
        key: axis.key,
        name: axis.name,
        raw: Math.round(raw),
        drain: Math.round(drain),
        contribution: contribution,
        severity: severityFor(drain),
        weight: axis.weight,
        protocol: axis.protocol[severityFor(drain)]
      };
    });

    var totalDrain = perAxis.reduce(function (s, a) { return s + a.contribution; }, 0);
    var bandwidth = clamp(Math.round(100 - totalDrain), 1, 99);

    // Leak ranking — each axis's share of the *total drain* (not bandwidth).
    // This is the actionable number: "37% of your drain is from open loops".
    var sumContrib = perAxis.reduce(function (s, a) { return s + a.contribution; }, 0) || 1;
    var leaks = perAxis
      .map(function (a) {
        return {
          key: a.key,
          name: a.name,
          severity: a.severity,
          drain: a.drain,
          sharePct: Math.round((a.contribution / sumContrib) * 100),
          protocol: a.protocol
        };
      })
      .sort(function (a, b) { return b.sharePct - a.sharePct; });

    return {
      bandwidth: bandwidth,
      drain: Math.round(totalDrain),
      diagnosis: diagnosisFor(bandwidth),
      tone: toneFor(bandwidth),
      leaks: leaks
    };
  }

  var api = {
    compute: compute,
    AXES: AXES,
    _internals: { clamp: clamp, severityFor: severityFor, toneFor: toneFor, diagnosisFor: diagnosisFor }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.BandwidthEngine = api;
  }
})(typeof window !== 'undefined' ? window : this);
