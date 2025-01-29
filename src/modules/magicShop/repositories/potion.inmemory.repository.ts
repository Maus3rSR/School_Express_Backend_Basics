import { Potion } from "../model";

// Que pour l'exemple /!\
// en production avec une bdd,
// soit vous utilisez UUID, soit la base de données génère son propre identifiant
function idGenerator(startAt: number = 0) {
  let id = startAt;

  return {
    next() {
      id += 1;
      return id;
    },
  };
}

export default class PotionInMemoryRepository {
  idGenerator = idGenerator(2);
  potions: Potion[] = [
    {
      id: 1,
      name: "Potion de soins",
      description: "Soigne les PV's",
      price: 10,
    },
    {
      id: 2,
      name: "Potion de mana",
      description: "Donne des MP's",
      price: 20,
    },
  ];

  findAll(sortBy?: string) {
    return this.potions.toSorted((a, b) => {
      if (sortBy === "price") {
        return b.price - a.price;
      }

      return 0;
    });
  }

  findOne(id: number) {
    return this.potions.find((potion) => potion.id === id);
  }

  add(potion: Omit<Potion, "id">): Potion {
    const newPotion = {
      id: this.idGenerator.next(),
      name: potion.name,
      description: potion.description,
      price: potion.price,
    };

    this.potions.push(newPotion);

    return newPotion;
  }
}
