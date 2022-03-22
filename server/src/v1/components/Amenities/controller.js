import service from './service';

const x = {};

x.get = async (req, res, next) => {
  try {
    const amenities = await service.getAll();
    return res.status(200).json({
      amenities,
    });
  } catch (error) {
    next(error);
  }
};

x.getSpecific = async (req, res, next) => {
  try {
    const amenities = await service.getSpecific(req.params.id);
    return res.status(200).json({
      amenities,
    });
  } catch (error) {
    next(error);
  }
};

export default x;
