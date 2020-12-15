import H1 from "@assets/views/Swipe/H1.png";
import H2 from "@assets/views/Swipe/H2.png";
import H3 from "@assets/views/Swipe/H3.png";
import H4 from "@assets/views/Swipe/H4.png";
import H5 from "@assets/views/Swipe/H5.png";
import H6 from "@assets/views/Swipe/H6.png";

import Brown from "@assets/views/Swipe/Brown.png";
import Columbia from "@assets/views/Swipe/Columbia.png";
import Cornell from "@assets/views/Swipe/Cornell.png";
import Dartmouth from "@assets/views/Swipe/Dartmouth.png";
import Penn from "@assets/views/Swipe/Penn.png";
import Princeton from "@assets/views/Swipe/Princeton.png";

const HARVARD_IDS = [H1, H2, H3, H4, H5, H6];
const NON_HARVARD_IDS = [Brown, Columbia, Cornell, Dartmouth, Penn, Princeton];

export { HARVARD_IDS, NON_HARVARD_IDS };

export function getRandomId(prob: number): { harvard: boolean; source: any } {
  if (Math.random() < prob) {
    return {
      harvard: true,
      source: HARVARD_IDS[Math.floor(Math.random() * HARVARD_IDS.length)],
    };
  }
  return {
    harvard: false,
    source: NON_HARVARD_IDS[Math.floor(Math.random() * NON_HARVARD_IDS.length)],
  };
}
