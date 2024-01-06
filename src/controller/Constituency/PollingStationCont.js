import PollingStationsModel from "../../model/Constituency/PollingStations.js";

const PollingStationController = {
  create: async (req, res) => {
    const {
      PollingStationName,
      PollingStationAddress,
      agentName,
      agentCnic,
      agentPhoneNumber,
    } = req.body;
    try {
      const pollingStation = await PollingStationsModel.findOne({
        where: { PollingStationName },
      });
      if (pollingStation) {
        res.status(400).json({ message: "polling Station already exist" });
      } else {
        await PollingStationsModel.create({
          PollingStationName,
          PollingStationAddress,
          agentName,
          agentCnic,
          agentPhoneNumber,
        });
        res
          .status(200)
          .json({ message: "polling Station created", pollingStation });
      }
    } catch (error) {
      res.status(404).json({
        message: "Something Bad happened in polling Station creation.",
        error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        PollingStationName,
        PollingStationAddress,
        agentName,
        agentCnic,
        agentPhoneNumber,
      } = req.body;
      const pollingStation = await PollingStationsModel.findOne({
        where: { id },
      });
      if (!pollingStation) {
        res.status(400).json({ message: "polling Station not found" });
      }
      (pollingStation.PollingStationName = PollingStationName),
        (pollingStation.PollingStationAddress = PollingStationAddress),
        (pollingStation.agentName = agentName),
        (pollingStation.agentCnic = agentCnic),
        (pollingStation.agentPhoneNumber = agentPhoneNumber),
        pollingStation.save(
          res.json({ message: "polling Station updated successfully" })
        );
    } catch (error) {
      res.status(404).json({
        message: "Something Bad happened in polling Station updation.",
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const pollingStation = await PollingStationsModel.findAll({});
      res.json({ pollingStation });
    } catch (error) {
      res.status(400).json({
        message: "something bad happened in fetching polling Station.",
      });
    }
  },
  getOnlyOne: async (req, res) => {
    const { id } = req.params;
    try {
      const pollingStation = await PollingStationsModel.findOne({
        where: { id },
      });
      res
        .status(200)
        .json({ message: "polling Station Found", pollingStation });
    } catch (error) {
      res
        .status(404)
        .json({
          message: "something bad happened in polling Station find",
          error,
        });
    }
  },
};

export default PollingStationController;
