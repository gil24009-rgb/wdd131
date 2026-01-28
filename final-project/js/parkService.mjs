const parkInfoLinks = [
  {
    name: "Things To Do &#x203A;",
    link: "things_to_do.html",
    image: "",
    description: "Learn about what there is to do in the park."
  },
  {
    name: "Plan Your Visit &#x203A;",
    link: "plan.html",
    image: "",
    description: "Learn how to plan your visit."
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "conditions.html",
    image: "",
    description: "Fee page not included, linking to current info page."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "conditions.html",
    image: "",
    description: "Visitor centers list is on the conditions page."
  }
];

const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };

  const response = await fetch(baseUrl + url, options);
  if (!response.ok) throw new Error("response not ok");
  return response.json();
}

export function getInfoLinks(images) {
  const withUpdatedImages = parkInfoLinks.map((item, index) => {
    const image = images[index + 2];
    return { ...item, image: image ? image.url : "" };
  });
  return withUpdatedImages;
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=yell");
  return parkData.data[0];
}

export async function getParkAlerts(code) {
  const parkData = await getJson(`alerts?parkCode=${code}`);
  return parkData.data;
}

export async function getParkVisitorCenters(code) {
  const parkData = await getJson(`visitorcenters?parkCode=${code}`);
  return parkData.data;
}

export async function getParkVisitorCenterDetails(id) {
  const parkData = await getJson(`visitorcenters?id=${id}`);
  return parkData.data[0];
}