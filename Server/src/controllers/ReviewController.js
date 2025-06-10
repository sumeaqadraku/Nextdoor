const { Review, User } = require('../models');

exports.createReview = async (req, res) => {
  try {
    const { rating, comment, title, propertyId, agentId } = req.body;
    const userId = req.user.id;


    if (!rating || !userId || !title || (!propertyId && !agentId)) {
      return res.status(400).json({ message: 'Rating, userId, title, and either propertyId or agentId are required' });
    }
    if (propertyId && agentId) {
      return res.status(400).json({ message: 'Provide either propertyId or agentId, not both' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (agentId) {
      const agent = await User.findByPk(agentId);
      if (!agent || agent.role !== 'agent') {
        return res.status(404).json({ message: 'Agent not found or not an agent' });
      }
    }

    const review = await Review.create({ rating, comment, title, userId, propertyId, agentId });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const { agentId, propertyId } = req.query;
    let reviews;
    if (agentId) {
      reviews = await Review.findAll({
        where: { agentId },
        include: [{ model: User, as: 'user', attributes: ['username'] }],
      });
    } else if (propertyId) {
      reviews = await Review.findAll({
        where: { propertyId },
        include: [{ model: User, as: 'user', attributes: ['username'] }],
      });
    } else {
      reviews = await Review.findAll({
        include: [{ model: User, as: 'user', attributes: ['username'] }],
      });
    }
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['username'] },
        { model: User, as: 'agent', attributes: ['username'] },
      ],
    });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAgentReviews = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Kontrollo nëse agentId është valid
    if (!agentId) {
      return res.status(400).json({ message: 'Agent ID is required' });
    }

    // Merr të gjitha reviews për agjentin e specifikuar
    const reviews = await Review.findAll({
      where: { agentId },
      include: [{ model: User, as: 'user', attributes: ['username'] }],
    });

    // Kontrollo nëse ka reviews
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this agent' });
    }

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews for agent' });
  }
};


exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment, title } = req.body;

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (title !== undefined) review.title = title;

    await review.save();
    res.json({ message: 'Review updated successfully', review });
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