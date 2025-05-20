
exports.createReview = async (req, res) => {
  try {
    const { rating, comment, userId, propertyId } = req.body;

    
    if (!rating || !userId || !propertyId) {
      return res.status(400).json({ message: 'Rating, userId and propertyId are required' });
    }

    const review = await Review.create({ rating, comment, userId, propertyId });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    // Find the review
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update the fields
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();

    res.json({ message: 'Review updated successfully', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/reviewController.js

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.destroy();
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

