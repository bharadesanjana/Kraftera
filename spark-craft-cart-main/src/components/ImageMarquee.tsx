import { motion } from 'framer-motion';

import beadedBracelets from '@/assets/beaded-bracelets.png';
import bowl from '@/assets/bowl.jpeg';
import braceletStarMoon from '@/assets/bracelet-star-moon.jpeg';
import candlePair from '@/assets/candlepair.jpeg';
import handmadeBangle from '@/assets/handmadebangle.jpeg';
import jhumkaEaring from '@/assets/jhumkaearing.jpeg';
import keychain from '@/assets/keychain.jpeg';
import necklace from '@/assets/necklace.jpeg';
import keychain1 from '@/assets/keychain1.jpeg';
import padentNecklace from '@/assets/padent-necklace.jpeg';
import smallPadentNecklace from '@/assets/smallpadent-necklace.jpeg';
import necklace2 from '@/assets/necklace2.jpeg';
import blackEarring from '@/assets/blackearring.jpeg';
import starBracelet from '@/assets/starbracelet.jpeg';

const images = [
  { src: beadedBracelets,      alt: 'Beaded bracelets' },
  { src: bowl,                  alt: 'Handmade bowl' },
  { src: braceletStarMoon,      alt: 'Star moon bracelet' },
  { src: candlePair,            alt: 'Candle pair' },
  { src: handmadeBangle,        alt: 'Handmade bangle' },
  { src: jhumkaEaring,          alt: 'Jhumka earrings' },
  { src: keychain,              alt: 'Keychain' },
  { src: necklace,              alt: 'Necklace' },
  { src: keychain1,             alt: 'Keychain style 2' },
  { src: padentNecklace,        alt: 'Pendant necklace' },
  { src: smallPadentNecklace,   alt: 'Small pendant necklace' },
  { src: necklace2,             alt: 'Necklace style 2' },
  { src: blackEarring,          alt: 'Black earring' },
  { src: starBracelet,          alt: 'Star bracelet' },
];

// Triple for seamless infinite loop
const track = [...images, ...images, ...images];

const ImageMarquee = () => (
  <div className="overflow-hidden w-full">
    {/* Marquee strip */}
    <div
      className="relative flex"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
    >
      <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
        {track.map((img, i) => (
          <div
            key={i}
            className="flex-none w-52 h-68 md:w-60 md:h-76 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-secondary"
            style={{ height: '17rem' }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ImageMarquee;
