// import { reminderService } from "../mongoServices";

const addReminder = async (req, res) => {
  try {
    let { body } = req,
      data = null;

    data = await reminderService.addReminder(body);
    data &&
      res.status(200).send({
        success: true,
        message: "Reminder Add SuccessFully",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default {
  addReminder,
};
