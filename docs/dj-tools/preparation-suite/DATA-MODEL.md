# Data model

Separate embedded tags from DJ preparation. Versioned JSON project: schemaVersion, track identity, tags, analysis (BPM, key, Camelot), beatgrid (BPM, offsetSeconds, beatsPerBar), cues (slot, name, timeSeconds, color), loops and phrase markers. Waveform cache separate. Local persistence is not a backup; export JSON.

Metadata patch: string fields; absent preserves, empty deletes. Artwork undefined preserves, null removes, object replaces. Unsupported formats must fail safely.
