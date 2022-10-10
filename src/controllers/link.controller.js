import { nanoid } from "nanoid";
import { infoMessages } from "../constants/infoMessages.js";

import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });
    return res.status(200).json({ links });
  } catch (error) {
    console.log("GET_LINKS", error);
    res.status(500).json({ error: infoMessages.serverError });
  }
};

export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({ error: infoMessages.linkNotFound });
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: infoMessages.noPermissions });
    }

    return res.status(200).json({ link });
  } catch (error) {
    console.log("GET_LINK", error);

    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: infoMessages.idFormatError });
    }

    res.status(500).json({ error: infoMessages.serverError });
  }
};

export const createLink = async (req, res) => {
  try {
    const { longLink } = req.body;

    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
    const newLink = await link.save();

    return res.status(201).json({ newLink });
  } catch (error) {
    console.log("CREATE_LINK", error);
    res.status(500).json({ error: infoMessages.serverError });
  }
};

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { longLink } = req.body;

    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({ error: infoMessages.linkNotFound });
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: infoMessages.noPermissions });
    }

    link.longLink = longLink;
    await link.save();

    return res.status(200).json({ link });
  } catch (error) {
    console.log("UPDATE_LINK", error);

    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: infoMessages.idFormatError });
    }

    res.status(500).json({ error: infoMessages.serverError });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({ error: infoMessages.linkNotFound });
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: infoMessages.noPermissions });
    }

    await link.remove();

    return res.status(200).json({ link });
  } catch (error) {
    console.log("DELETE_LINK", error);

    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: infoMessages.idFormatError });
    }

    res.status(500).json({ error: infoMessages.serverError });
  }
};
