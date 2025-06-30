const { uploadFile } = require("../configs/uploadfile");
const ServiceModel = require("../models/ServiceModel");

// Create Service
exports.createService = async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: "Images are required" });
    }

    const serviceImages = req.files.images;
    const uploadedImages = await uploadFile(serviceImages);

    const newService = await ServiceModel.create({
      ...req.body,
      provider: req.user._id,
      images: uploadedImages,
    });
    res.status(201).json({ message: "Service created", newService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating service", error: error.message });
    console.log("error in createService : ", error);
  }
};

// Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await ServiceModel.find().populate(
      "provider",
      "name email"
    );
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
    console.log("error in getAllServices : ", error);
  }
};

// Get All Services By Id
exports.getProviderServicesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const services = await ServiceModel.find({
      provider: req.user._id,
      status,
    })
      .populate("provider", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
    console.log("error in getAllServices : ", error);
  }
};

// Get Single Service by ID
exports.getServiceById = async (req, res) => {
  console.log(req.params);
  try {
    const service = await ServiceModel.findById(req.params.id).populate(
      "provider",
      "name email profilePic"
    );
    //   .populate("reviews.user", "name");
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
    console.log("error in getServiceById : ", error);
  }
};

// Get Services by Category
exports.getServiceByCategory = async (req, res) => {
  try {
    console.log(req.params);
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const services = await ServiceModel.find({ category }).populate(
      "provider",
      "name email profilePic"
    );

    console.log("services : ", services);

    if (!services || services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this category" });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error in getServiceByCategory:", error);
    res.status(500).json({
      message: "Error fetching services by category",
      error: error.message,
    });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  try {
    let service = await ServiceModel.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (service.provider.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "Unauthorized to update this service" });

    const updated = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
    console.log("error in updateService : ", error);
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const service = await ServiceModel.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (service.provider.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this service" });

    await service.deleteOne();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};

// Add Review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id } = req.params; // service id

    const service = await ServiceModel.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Check if user already reviewed
    const alreadyReviewed = service.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed)
      return res
        .status(400)
        .json({ message: "You have already reviewed this service" });

    console.log("req", req.user);

    const newReview = {
      user: req.user._id,
      comment,
      rating: Number(rating),
    };

    service.reviews.push(newReview);

    // Recalculate average rating
    const total = service.reviews.reduce((acc, item) => acc + item.rating, 0);
    service.rating = total / service.reviews.length;

    await service.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
    console.log("error in addReview : ", error);
  }
};

// Update Service Status (Provider only)
exports.updateServiceStatus = async (req, res) => {
  try {
    let { id } = req.params;
    let { state } = req.body;
    console.log(req.body);

    let service = await ServiceModel.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    service.status = state;

    await service.save();

    res.status(200).json({ message: "Status updated", service });
  } catch (error) {
    res.status(500).json({
      message: "Error while updating service status",
      error: error.message,
    });

    console.log("error in updateServiceStatus : ", error);
  }
};
