import { faker } from "@faker-js/faker";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  _id: faker.string.uuid(),

  name: faker.name.fullName(),
  email: faker.company.name(),
  message: faker.git.commitMessage(),
}));

export default users;
