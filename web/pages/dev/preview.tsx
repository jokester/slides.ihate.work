import { SlideBundle } from '../../src/core/SlideBundle';
import { defaultSlideText } from '../../src/markdown/markdown-form';
import { RevealSlidePreview } from '../../src/player/reveal-slide-preview';

export default function DevPreviewPage() {
  const src: SlideBundle = {
    slideText: defaultSlideText,
  };

  return (
    <div>
      <h1>Preview</h1>
      <RevealSlidePreview src={src} />
    </div>
  );
}
