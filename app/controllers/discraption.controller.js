const db = require("../models");
const Discraption = db.discraption;

// Create and Save a new daet
exports.create = (req, res) => {
   // Create a daet
   const discraption = new Discraption({
      title: req.body.title ? req.body.title : "khaleed",
      definition: req.body.definition
         ? req.body.definition
         : "write any thing ",
      buttonName: req.body.buttonName
         ? req.body.buttonName
         : "check your data in server",
   });

   // Save locatins in the database
   discraption
      .save(discraption)
      .then((data) => {
         res.send(data);
         console.log("Created A new Discraption");
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the calender",
         });
      });
};

// Retrieve all calenders from the database.
exports.findAll = (req, res) => {
   const title = req.query.title;

   var condition = title
      ? { company_name: { $regex: new RegExp(company_name), $options: "i" } }
      : {};

   Discraption.find(condition)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving Discraptions.......",
         });
      });
};

// Find a single Discraptions with an id
exports.findOne = (req, res) => {
   const id = req.params.id;

   Discraption.findById(id)
      .then((data) => {
         if (!data)
            res.status(404).send({
               message: "Not found locatin with id " + id,
            });
         else res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error retrieving Discraption with id=" + id,
         });
      });
};

// Update a Discraptions by the id in the request
exports.update = (req, res) => {
   if (!req.body) {
      return res.status(400).send({
         message: "Data to update can not be empty!",
      });
   }

   const id = req.params.id;

   Discraption.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update location with id=${id}. Maybe location was not found!`,
            });
         } else res.send({ message: "location was updated successfully." });
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating location with id=" + id,
         });
      });
};

// Delete a Discraptions with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
   if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
   }

   Discraption.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete Discraption with id=${id}. Maybe Discraption was not found!`,
            });
         } else {
            res.send({
               message: "Discraption was deleted successfully!",
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Could not delete Discraption with id=" + id,
         });
      });
};

// UNDisplay for list without Delete
exports.published = (req, res) => {
   const id = req.params.id;

   Discraption.findByIdAndUpdate(
      id,
      {
         $set: {
            published: false,
            updatedAt: new Date(),
         },
      },
      { useFindAndModify: false }
   )
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update Discraption with id=${id}. Maybe Discraption was not found!`,
            });
         } else {
            res.send({ message: "Discraption was updated successfully." });
            console.log(`Discraption was unDisplay successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating Discraption with id=" + id,
         });
      });
};

// Display for list
exports.recovery = (req, res) => {
   const id = req.params.id;

   Discraption.findByIdAndUpdate(
      id,
      {
         $set: {
            published: true,
         },
      },
      { useFindAndModify: false }
   )
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update Discraption with id=${id}. Maybe Discraption was not found!`,
            });
         } else {
            res.send({ message: "Discraption was updated successfully." });
            console.log(`Discraption was Recovery successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating Discraption with id=" + id,
         });
      });
};

// Delete all Discraptions from the database.
exports.deleteAll = (req, res) => {
   Discraption.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} Discraptions were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all Discraptions.",
         });
      });
};

// Find all published Discraptions
exports.findAllPublished = (req, res) => {
   var selectedData = {
      __v: false,
      _id: false,
      allDay: false,
      className: false,
      published: false,
   };
   Discraption.find({ published: true }, selectedData)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving Discraptions.",
         });
      });
};
exports.findAllunPublished = (req, res) => {
   Discraption.find({ published: false })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving Discraptions.",
         });
      });
};
