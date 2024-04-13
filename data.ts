import { faker } from "@faker-js/faker";

interface  cardProps {

}
export const data_card = [...Array(50).keys()].map((_, i) => {
    const imageUrl = faker.image.avatar();
  return {
    image: imageUrl,
    descripition: faker.lorem.paragraphs(1),
  }
});