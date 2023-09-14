import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const banners = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    _id: faker.string.uuid(),
    image:
      "https://plus.unsplash.com/premium_photo-1681408059522-b83aa9c0a0be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym90dGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    status: sample(["Private", "Public"]),
  };
});

export default banners;
