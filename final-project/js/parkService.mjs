// parkService.mjs
// Data and data-like configuration for the park pages.

const park = {
  id: "F58C6D24-8D10-4573-9826-65D42B8B83AD",
  url: "https://www.nps.gov/yell/index.htm",
  fullName: "Yellowstone National Park",
  parkCode: "yell",
  description:
    "On March 1, 1872, Yellowstone became the first national park for all to enjoy the unique hydrothermal wonders. Today, millions of people come here each year to camp, hike, and enjoy the majesty of the park.",
  latitude: "44.59824417",
  longitude: "-110.5471695",
  latLong: "lat:44.59824417, long:-110.5471695",
  states: "ID,MT,WY",
  contacts: {
    phoneNumbers: [
      {
        phoneNumber: "307-344-7381",
        description: "",
        extension: "",
        type: "Voice"
      },
      {
        phoneNumber: "307-344-2014",
        description: "",
        extension: "",
        type: "Fax"
      },
      {
        phoneNumber: "307-344-2386",
        description: "",
        extension: "",
        type: "TTY"
      }
    ],
    emailAddresses: [
      {
        description:
          "Contact Yellowstone's park rangers for general park questions, lost and found, or for special use permits.",
        emailAddress: "YELL_Information@nps.gov"
      }
    ]
  },
  addresses: [
    {
      postalCode: "82190",
      city: "Yellowstone National Park",
      stateCode: "WY",
      countryCode: "US",
      provinceTerritoryCode: "",
      line1: "2 Officers Row",
      type: "Physical",
      line3: "",
      line2: "Yellowstone National Park Headquarters"
    },
    {
      postalCode: "82190-0168",
      city: "Yellowstone National Park",
      stateCode: "WY",
      countryCode: "US",
      provinceTerritoryCode: "",
      line1: "PO Box 168",
      type: "Mailing",
      line3: "",
      line2: ""
    }
  ],
  directionsInfo:
    "Yellowstone National Park covers nearly 3,500 square miles in the northwest corner of Wyoming (3% of the park is in Montana and 1% is in Idaho). Yellowstone has five entrance stations, and several are closed to regular vehicles during winter.",
  directionsUrl: "https://www.nps.gov/yell/planyourvisit/directions.htm",
  operatingHours: [],
  entranceFees: [],
  entrancePasses: [],
  fees: [],
  images: [
    {
      credit: "NPS / Neal Herbert",
      title: "Grand Prismatic Spring",
      altText: "Aerial view of colorful hot spring and surrounding landscape.",
      caption: "Grand Prismatic Spring",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5920-1DD8-B71B-0B83F012ED802CEA.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Mammoth Hot Springs",
      altText: "Travertine terraces with steam rising from the formations.",
      caption: "Mammoth Hot Springs",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D593B-1DD8-B71B-0BA6267A3A594C3B.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Grand Canyon of the Yellowstone",
      altText: "A boardwalk along a hot spring at the edge of a lake.",
      caption: "Yellowstone scenic view",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5A1B-1DD8-B71B-0B6D13F9E89A8F1A.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Old Faithful",
      altText: "Geyser erupting with visitors watching from boardwalk.",
      caption: "Old Faithful erupts",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5A03-1DD8-B71B-0B5B74C0FDC6D8A7.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Bison",
      altText: "A bison standing in grass with mountains in the background.",
      caption: "Bison in Yellowstone",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5A2F-1DD8-B71B-0B5B9EDDE2A5E042.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Yellowstone Lake",
      altText: "Lake view with shoreline and distant mountains.",
      caption: "Yellowstone Lake",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5A46-1DD8-B71B-0B5AFEB0F95E7340.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Hayden Valley",
      altText: "Wide valley landscape with river and mountains.",
      caption: "Hayden Valley",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5A63-1DD8-B71B-0B5F4F3F73B6E6CB.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Winter in Yellowstone",
      altText: "Snowy landscape with trees and steam.",
      caption: "Winter scenery",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5A7F-1DD8-B71B-0B5FBE0E0E1870C2.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Wildlife",
      altText: "Elk in a meadow near trees.",
      caption: "Elk in Yellowstone",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5A9A-1DD8-B71B-0B63ED2B2A4A2CC6.jpg"
    },
    {
      credit: "NPS / Neal Herbert",
      title: "Yellowstone River",
      altText: "Rams resting on snow covered ground.",
      caption: "Wildlife in Yellowstone",
      url: "https://www.nps.gov/common/uploads/structured_data/8AB8F1A3-D1A0-A6FB-E8E5CAA8B2937264.jpeg"
    }
  ],
  weatherInfo:
    "Yellowstone's weather can vary quite a bit, even in a single day. In the summer, daytime highs can exceed 70°F (21°C), only to drop 20 or more degrees when a thunderstorm rolls through. It can snow during any month of the year, and winter lows frequently drop below 0°F (-18°C), especially at night. Bring a range of clothing options, including a warm jacket and rain gear, even in the summer.",
  name: "Yellowstone",
  designation: "National Park"
};

export function getParkData() {
  return park;
}

// Content links for the home page sections.
// Keeping them in data makes it easy to swap content later.
export const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: park.images[2].url,
    description: "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: park.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: park.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];