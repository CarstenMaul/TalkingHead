# Parallel Animation Implementation

The parallel animation implementation enables body gestures to play simultaneously with speech by splitting animations into two independent queues. Here's how it works:

## Core Architecture

**Two Independent Animation Queues:**
```javascript
this.animQueue = [];      // Face/speech animations, lipsync visemes
this.gestureQueue = [];   // Body movements, hand gestures
```

Both queues run simultaneously in the animation loop, allowing face and body animations to execute in parallel.

## Animation Property Classification

The system categorizes animation properties into three types:

```javascript
bodyOnlyProps: ['gesture', 'bodyRotateX', 'bodyRotateY', 'bodyRotateZ', 'handLeft', 'handRight', 'handFistLeft', 'handFistRight']

faceBlockingProps: ['mouth', 'jaw', 'viseme_', 'tongue']  // Block lipsync

faceSafeProps: ['eyeContact', 'headMove', 'headRotateX', 'headRotateY', 'headRotateZ', 'pose', 'eyeBlinkLeft', 'eyeBlinkRight']
```

This classification determines which queue handles each animation component.

## SSML-Synchronized Timing System

**The Revolutionary Approach:**
1. **Emoji Removal from TTS**: Emojis are removed from sentence dividers but tracked by word position:
   ```javascript
   const dividersSentence = /[!\.\?\n]/ug;  // No emojis here anymore
   ```

2. **Emoji Position Tracking**: During text processing, emojis are mapped to word indices:
   ```javascript
   emojiTimingMap.set(sentenceId, {
       emojis: [{ emoji: '👋', wordIndex: 2 }],
       wordOffset: globalWordIndex
   });
   ```

3. **SSML Timepoint Synchronization**: Google TTS returns precise timing data:
   ```javascript
   "timepoints": [
       {"markName": "word_2", "timeSeconds": 1.234},
       {"markName": "word_5", "timeSeconds": 2.567}
   ]
   ```

4. **Precise Gesture Scheduling**: Gestures are scheduled using real TTS timing:
   ```javascript
   setTimeout(() => {
       this.playGestureEmoji(emoji.emoji);
   }, timeSeconds * 1000);
   ```

## Animation Splitting Process

The `splitAnimationTemplate()` function separates emoji animations:

```javascript
splitAnimationTemplate(template) {
    const bodyTemplate = { ...template, items: [] };
    const faceTemplate = { ...template, items: [] };
    
    template.items.forEach(item => {
        if (this.bodyOnlyProps.some(prop => item.name.includes(prop))) {
            bodyTemplate.items.push(item);  // → Gesture queue
        } else {
            faceTemplate.items.push(item);  // → Main queue (when not speaking)
        }
    });
    
    return { bodyTemplate, faceTemplate };
}
```

## Parallel Execution

Both queues process independently:

```javascript
// Main animation loop
this.processAnimationQueue();    // Face/speech animations
this.processGestureQueue();      // Body animations in parallel
```

**Key Benefits:**
- **No Speech Interruption**: Body gestures don't affect lipsync
- **Precise Timing**: SSML timepoints ensure perfect synchronization
- **Natural Flow**: Continuous speech with expressive gestures
- **Speed Control**: Configurable animation speeds via `gestureSpeedMultiplier`

## API Methods

```javascript
// Direct gesture playback (immediate)
avatar.playGestureEmoji('👋');

// Enhanced gesture method (splits body/face automatically)
avatar.gesture('🤷‍♂️', duration);

// Speed control
avatar.setGestureSpeed(0.6); // 40% faster animations
```

## Supported Body Gestures

| Emoji | Animation | Can Play During Speech |
|-------|-----------|----------------------|
| ✋🤚👋 | Hand wave | ✅ Yes |
| 👍 | Thumbs up | ✅ Yes |
| 👎 | Thumbs down | ✅ Yes (facial expression queued) |
| 👌 | OK gesture | ✅ Yes |
| 🤷‍♂️ | Shrug | ✅ Yes |
| 🙏 | Prayer/namaste | ✅ Yes (with subtle facial) |
| 👉 | Point right | ✅ Yes |
| 👈 | Point left | ✅ Yes |

## Implementation Details

### Before Implementation
- Body gestures would interrupt speech
- Emojis in text would pause lipsync
- Camera would focus for every gesture
- Only one animation type could play at a time

### After Implementation  
- Body gestures play simultaneously with speech
- Lipsync continues uninterrupted
- Facial expressions are queued for after speech
- Natural conversation flow maintained
- Camera focus only for facial expressions

### Performance Impact
- Minimal: Same animation processing, just split across two queues
- Memory: Slight increase for gesture queue storage
- Processing: Parallel loops vs single loop (negligible difference)

## Usage Examples

```javascript
// Text with gestures - now plays body parts during speech
avatar.speakText("Hello! 👋 Great to see you! 👍");

// Manual gesture during speech
avatar.speakText("I'm explaining something important...");
avatar.playGestureEmoji('👉'); // Points while speaking

// Direct gesture calls
avatar.gesture('🤷‍♂️', 3); // 3 second shrug, can overlap with speech

// Speed adjustment
avatar.setGestureSpeed(0.4); // Very fast animations
avatar.setGestureSpeed(1.5); // Slower animations
```

This approach transformed the system from sequential (gestures interrupt speech) to truly parallel (gestures enhance speech), creating much more natural and expressive avatar behavior.