import { Request, Response } from "express";
import { NotFoundException } from "~/exceptions/http.exception";
import PotionRepository from "./repositories/potion.inmemory.repository";

const repository = new PotionRepository();

export function retrievePotions(req: Request, res: Response) {
  const tri = req.query.tri as string;
  const potions = repository.findAll(tri);
  res.status(200).json(potions);
}

export function retrieveOnePotion(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const potion = repository.findOne(id);

  if (!potion) {
    throw new NotFoundException(`La potion d'id ${id} n'existe pas.`);
  }

  res.status(200).json(potion);
}

export function addNewPotion(req: Request, res: Response) {
  const newPotion = req.body;
  const potion = repository.add(newPotion);
  res.status(201).json(potion);
}
