# TalkingHead Animation Attributes Reference

This document provides a complete reference of all animation attributes (morph targets and properties) available in the TalkingHead system.

## Overview

Animation attributes in TalkingHead are defined from multiple sources and control various aspects of the 3D avatar's appearance and behavior. These attributes are accessed through the morph target system and used in animations, mood settings, and direct API calls.

## Definition Sources

### 1. Avatar Model (`morphTargetDictionary`)
The primary source of morph targets comes from the loaded 3D avatar model's `morphTargetDictionary`. This typically includes ARKit-compatible blend shapes.

### 2. Custom Morph Targets (`this.mtCustoms`)
```javascript
this.mtCustoms = [
  "handFistLeft", "handFistRight", 'bodyRotateX', 'bodyRotateY',
  'bodyRotateZ', 'headRotateX', 'headRotateY', 'headRotateZ', 'chestInhale'
];
```

### 3. RPM Extra Blend Shapes (`this.mtExtras`)
Composite morph targets created from combinations of other targets:
```javascript
this.mtExtras = [
  { key: "mouthOpen", mix: { jawOpen: 0.5 } },
  { key: "mouthSmile", mix: { mouthSmileLeft: 0.8, mouthSmileRight: 0.8 } },
  { key: "eyesClosed", mix: { eyeBlinkLeft: 1.0, eyeBlinkRight: 1.0 } },
  { key: "eyesLookUp", mix: { eyeLookUpLeft: 1.0, eyeLookUpRight: 1.0 } },
  { key: "eyesLookDown", mix: { eyeLookDownLeft: 1.0, eyeLookDownRight: 1.0 } }
];
```

### 4. Viseme Targets
Lip-sync morph targets for speech animation (see [Viseme Controls](#viseme-controls-lip-sync) section).

## Complete Attribute Reference

### Facial Expression Controls (ARKit Blend Shapes)

#### Brow Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `browDownLeft` | Left eyebrow down (anger, concentration) | 0.0-1.0 | Anger, focus expressions |
| `browDownRight` | Right eyebrow down | 0.0-1.0 | Asymmetric expressions |
| `browInnerUp` | Inner eyebrows up (surprise, concern) | 0.0-1.0 | Surprise, worry, sadness |
| `browOuterUpLeft` | Left outer eyebrow up | 0.0-1.0 | Skepticism, questioning |
| `browOuterUpRight` | Right outer eyebrow up | 0.0-1.0 | Asymmetric expressions |

#### Eye Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `eyeBlinkLeft` | Left eyelid closure | 0.0-1.0 | Blinking, winking, sleeping |
| `eyeBlinkRight` | Right eyelid closure | 0.0-1.0 | Blinking, winking |
| `eyeSquintLeft` | Left eye squint/smile | 0.0-1.0 | Happy expressions, bright light |
| `eyeSquintRight` | Right eye squint/smile | 0.0-1.0 | Happy expressions |
| `eyeWideLeft` | Left eye wide open | 0.0-1.0 | Surprise, fear, alert |
| `eyeWideRight` | Right eye wide open | 0.0-1.0 | Surprise, fear |

#### Eye Look Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `eyeLookUpLeft` | Left eye look up | 0.0-1.0 | Looking up, thinking |
| `eyeLookUpRight` | Right eye look up | 0.0-1.0 | Eye coordination |
| `eyeLookDownLeft` | Left eye look down | 0.0-1.0 | Looking down, reading |
| `eyeLookDownRight` | Right eye look down | 0.0-1.0 | Eye coordination |
| `eyeLookInLeft` | Left eye look toward nose | 0.0-1.0 | Cross-eyed look, focus |
| `eyeLookInRight` | Right eye look toward nose | 0.0-1.0 | Cross-eyed look |
| `eyeLookOutLeft` | Left eye look toward temple | 0.0-1.0 | Looking sideways |
| `eyeLookOutRight` | Right eye look toward temple | 0.0-1.0 | Looking sideways |

#### Jaw Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `jawOpen` | Jaw opening (mouth height) | 0.0-1.0 | Speech, surprise, yawning |
| `jawForward` | Jaw thrust forward | 0.0-1.0 | Aggression, determination |

#### Mouth Shape Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `mouthClose` | Mouth closure | 0.0-1.0 | Tight-lipped expression |
| `mouthFunnel` | Mouth funnel (O shape) | 0.0-1.0 | "Oh!" expression, vowel sounds |
| `mouthPucker` | Mouth pucker (kiss shape) | 0.0-1.0 | Kissing, "oo" sounds |
| `mouthLeft` | Mouth shift left | 0.0-1.0 | Asymmetric expressions |
| `mouthRight` | Mouth shift right | 0.0-1.0 | Asymmetric expressions |

#### Mouth Expression Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `mouthSmileLeft` | Left mouth corner smile | 0.0-1.0 | Happy expressions |
| `mouthSmileRight` | Right mouth corner smile | 0.0-1.0 | Happy expressions |
| `mouthFrownLeft` | Left mouth corner frown | 0.0-1.0 | Sad, angry expressions |
| `mouthFrownRight` | Right mouth corner frown | 0.0-1.0 | Sad, angry expressions |
| `mouthDimpleLeft` | Left cheek dimple | 0.0-1.0 | Smiling, laughing |
| `mouthDimpleRight` | Right cheek dimple | 0.0-1.0 | Smiling, laughing |

#### Mouth Deformation Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `mouthStretchLeft` | Left mouth corner stretch | 0.0-1.0 | Wide expressions, "ee" sounds |
| `mouthStretchRight` | Right mouth corner stretch | 0.0-1.0 | Wide expressions |
| `mouthRollLower` | Lower lip roll inward | 0.0-1.0 | Lip biting, certain consonants |
| `mouthRollUpper` | Upper lip roll inward | 0.0-1.0 | Lip expressions |
| `mouthShrugLower` | Lower lip shrug up | 0.0-1.0 | Pouting, "I don't know" |
| `mouthShrugUpper` | Upper lip shrug down | 0.0-1.0 | Disgust, disdain |
| `mouthPressLeft` | Left lip press together | 0.0-1.0 | Tension, concentration |
| `mouthPressRight` | Right lip press together | 0.0-1.0 | Tension, concentration |
| `mouthUpperUpLeft` | Left upper lip raise | 0.0-1.0 | Sneer, disgust |
| `mouthUpperUpRight` | Right upper lip raise | 0.0-1.0 | Sneer, disgust |
| `mouthLowerDownLeft` | Left lower lip down | 0.0-1.0 | Sad expressions |
| `mouthLowerDownRight` | Right lower lip down | 0.0-1.0 | Sad expressions |

#### Nose Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `noseSneerLeft` | Left nostril flare/sneer | 0.0-1.0 | Disgust, anger, laughter |
| `noseSneerRight` | Right nostril flare/sneer | 0.0-1.0 | Disgust, anger, laughter |

#### Cheek Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `cheekPuff` | Cheek puff out | 0.0-1.0 | Blowing, holding breath |
| `cheekSquintLeft` | Left cheek raise (smile muscle) | 0.0-1.0 | Genuine smiles, squinting |
| `cheekSquintRight` | Right cheek raise | 0.0-1.0 | Genuine smiles, squinting |

#### Tongue Controls
| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `tongueOut` | Tongue extension | 0.0-1.0 | Sticking tongue out, certain sounds |

### Composite/Virtual Controls

These are computed or composite morph targets that control multiple underlying targets:

| Attribute | Description | Components | Usage |
|-----------|-------------|------------|-------|
| `eyesClosed` | Both eyes closed | `eyeBlinkLeft` + `eyeBlinkRight` | Sleep, concentration |
| `eyesLookUp` | Both eyes look up | `eyeLookUpLeft` + `eyeLookUpRight` | Looking up, thinking |
| `eyesLookDown` | Both eyes look down | `eyeLookDownLeft` + `eyeLookDownRight` | Looking down, reading |
| `eyesRotateX` | Vertical eye rotation | Computed from look up/down | Eye movement |
| `eyesRotateY` | Horizontal eye rotation | Computed from look in/out | Eye movement |
| `mouthOpen` | General mouth opening | `jawOpen` * 0.5 | Speech, expressions |
| `mouthSmile` | General smile | `mouthSmileLeft` + `mouthSmileRight` | Happy expressions |

### Body & Head Controls

| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `bodyRotateX` | Body pitch rotation | -1.0 to 1.0 | Leaning forward/back |
| `bodyRotateY` | Body yaw rotation | -1.0 to 1.0 | Turning left/right |
| `bodyRotateZ` | Body roll rotation | -1.0 to 1.0 | Tilting sideways |
| `headRotateX` | Head pitch rotation | -1.0 to 1.0 | Nodding up/down |
| `headRotateY` | Head yaw rotation | -1.0 to 1.0 | Shaking left/right |
| `headRotateZ` | Head roll rotation | -1.0 to 1.0 | Head tilt |
| `headMove` | Head movement flag | 0.0-1.0 | Enables head movement |
| `chestInhale` | Chest breathing | 0.0-1.0 | Breathing animation |

### Hand Controls

| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `handLeft` | Left hand gesture trigger | Gesture ID | Hand animations |
| `handRight` | Right hand gesture trigger | Gesture ID | Hand animations |
| `handFistLeft` | Left hand fist | 0.0-1.0 | Clenched fist pose |
| `handFistRight` | Right hand fist | 0.0-1.0 | Clenched fist pose |

### Special Controls

| Attribute | Description | Range | Usage |
|-----------|-------------|-------|-------|
| `eyeContact` | Eye contact with camera | 0.0-1.0 | Gaze behavior |
| `pose` | Pose selection | Pose name | Body posture |
| `gesture` | Gesture animation trigger | Gesture array | Hand/body gestures |

### Viseme Controls (Lip-Sync)

Viseme morph targets for speech synchronization:

| Attribute | Phoneme | Description | Intensity |
|-----------|---------|-------------|-----------|
| `viseme_aa` | /ɑ/ | "ah" - father, car | 0.6 |
| `viseme_E` | /ɛ/ | "eh" - bet, said | 0.6 |
| `viseme_I` | /ɪ/ | "ih" - bit, him | 0.6 |
| `viseme_O` | /ɔ/ | "oh" - bought, saw | 0.6 |
| `viseme_U` | /u/ | "oo" - boot, you | 0.6 |
| `viseme_PP` | /p,b,m/ | Bilabial - put, but, mat | 0.9 |
| `viseme_SS` | /s,z/ | Sibilant - sit, zap | 0.6 |
| `viseme_TH` | /θ,ð/ | Dental - think, that | 0.6 |
| `viseme_DD` | /t,d,n/ | Alveolar - top, dot, not | 0.6 |
| `viseme_FF` | /f,v/ | Labiodental - fat, vat | 0.9 |
| `viseme_kk` | /k,g/ | Velar - cat, got | 0.6 |
| `viseme_nn` | /n/ | Nasal - new | 0.6 |
| `viseme_RR` | /r/ | Rhotic - red | 0.6 |
| `viseme_CH` | /tʃ,ʃ,dʒ/ | Postalveolar - church, she, judge | 0.6 |
| `viseme_sil` | silence | No sound/pause | 0.6 |

### Meta Properties

Special properties for animation control:

| Property | Description | Type | Usage |
|----------|-------------|------|-------|
| `subtitles` | Subtitle text display | String | Text overlay |
| `moveto` | Bone movement targets | Object | Direct bone control |

## Property Classification

The system classifies properties for parallel processing and conflict management:

### Body-Only Properties (`bodyOnlyProps`)
These properties can run during speech without interfering with lip-sync:
- `gesture`, `bodyRotateX`, `bodyRotateY`, `bodyRotateZ`
- `handLeft`, `handRight`, `handFistLeft`, `handFistRight`

### Face-Blocking Properties (`faceBlockingProps`)
These properties interfere with lip-sync and are blocked during speech:
- `mouth*`, `jaw*`, `viseme_*`, `tongue*`

### Face-Safe Properties (`faceSafeProps`)
These face properties can coexist with speech:
- `eyeContact`, `headMove`, `headRotateX`, `headRotateY`, `headRotateZ`
- `pose`, `eyeBlinkLeft`, `eyeBlinkRight`, `bodyRotateX`, `bodyRotateZ`

## Usage Examples

### Direct Morph Target Control
```javascript
// Set a single morph target
talkingHead.setMorphTarget('mouthSmile', 0.7);

// Set multiple targets
talkingHead.setMorphTarget('browInnerUp', 0.5, 1000); // 1 second transition
```

### Animation Templates
```javascript
// Emoji animation using multiple morph targets
'😊': { 
  dt: [300,2000], 
  rescale: [0,1], 
  vs: { 
    browInnerUp: [0.6], 
    eyeSquintLeft: [1], 
    eyeSquintRight: [1], 
    mouthSmile: [0.7], 
    noseSneerLeft: [0.7], 
    noseSneerRight: [0.7]
  } 
}
```

### Mood Baselines
```javascript
// Happy mood baseline adjustments
'happy': {
  baseline: { 
    browInnerUp: 0.4, 
    mouthSmile: 0.2, 
    eyeSquintLeft: 0.1, 
    eyeSquintRight: 0.1 
  }
}
```

## Value Ranges and Behavior

### Standard Range
- **Most morph targets**: 0.0 (neutral) to 1.0 (full expression)
- **Rotational properties**: -1.0 to 1.0 (bidirectional)

### Special Behaviors
- **Viseme intensity**: PP and FF visemes use 0.9, others use 0.6
- **Baseline offsets**: Can be applied on top of animation values
- **Volume effects**: Some visemes (aa, E, I, O, U) are affected by audio volume
- **Randomization**: Certain properties get randomized for natural variation

### Performance Considerations
- **Property limits**: Some properties have min/max constraints
- **Update rates**: Different acceleration and velocity limits per property
- **Easing**: Sigmoid easing applied for smooth transitions
- **Batch updates**: Multiple properties updated in single animation frame

---

This reference covers all animation attributes available in the TalkingHead system. For implementation details and animation template syntax, see the [Animation System Documentation](animation.md).