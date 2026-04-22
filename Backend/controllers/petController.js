import Pet from "../models/Pet.js";
import User from "../models/User.js";

// CREATE PET
export const createPet = async (req, res) => {
  try {
    const {
      name,
      type,
      breed,
      age,
      gender,
      description,
      image,
      emergencyContact,
      favourites,
      allergies,
      schedule,
    } = req.body;

    const pet = await Pet.create({
      name,
      type,
      breed,
      age,
      gender,
      description,
      image,
      emergencyContact,
      favourites,
      allergies,
      schedule,
      owner: req.userId,
    });

    await User.findByIdAndUpdate(req.userId, {
      $push: { pets: pet._id },
    });

    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL MY PETS
export const getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.userId });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE PET (IMPORTANT FOR /pet/:id PAGE)
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PET (used for EVERYTHING: allergies, schedule, etc.)
export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true },
    );

    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PET
export const deletePet = async (req, res) => {
  try {
    await Pet.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });

    res.json({ msg: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
