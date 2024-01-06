import ConstituencyModel from "../../model/Constituency/Constituency.js";
import PollingStationsModel from "../../model/Constituency/PollingStations.js";

const ConstituenController = {
  create: async (req, res) => {
    const { constituencyName, constituencyAddress } = req.body;
    try {
      const constituency = await ConstituencyModel.findOne({
        where: { constituencyName },
      });
      if (constituency) {
        res.status(400).json({ message: "constituency already exist" });
      } else {
        await ConstituencyModel.create({
          constituencyName,
          constituencyAddress,
        });
        res.status(200).json({ message: "constiyuency created", constituency });
      }
    } catch (error) {
      res.status(404).json({
        message: "Something Bad happened in constituency creation.",
        error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { constituencyName, constituencyAddress } = req.body;
      const constituency = await ConstituencyModel.findOne({
        where: { id },
      });
      if (!constituency) {
        res.status(400).json({ message: "constituency not found" });
      }
        constituency.constituencyName = constituencyName,
        constituency.constituencyAddress = constituencyAddress
        constituency.save(res.json({ message: "constituency updated successfully" }));
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something Bad happened in constituency updation." });
    }
  },
  getAll: async (req, res) => {
    try {
      const constituency = await ConstituencyModel.findAll({
        include: [PollingStationsModel],
      });
      res.json({ constituency });
    } catch (error) {
      res
        .status(400)
        .json({ message: "something bad happened in fetching constituencies." });
    }
  },
  getOnlyOne: async (req, res) => {
    const { id } = req.params;
    try {
      const constituency = await ConstituencyModel.findOne({
        where: { id },
        include: [PollingStationsModel],
      });
      res.status(200).json({ message: "admin Found", constituency });
    } catch (error) {
      res
        .status(404)
        .json({ message: "something bad happened in admin find", error });
    }
  },
};

export default ConstituenController;
