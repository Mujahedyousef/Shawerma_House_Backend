export class ProductOrderController {
  constructor(productOrderService) {
    this.productOrderService = productOrderService;
  }

  getAll = async (req, res, next) => {
    try {
      const orders = await this.productOrderService.getAllOrders();
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await this.productOrderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      if (error.message.includes('required') || error.message.includes('Invalid')) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  };

  create = async (req, res, next) => {
    try {
      const orderData = {
        productId: req.body.productId || null,
        name: req.body.name,
        email: req.body.email || null,
        phone: req.body.phone,
        countryCode: req.body.countryCode || '+971',
        message: req.body.message || null,
      };

      const order = await this.productOrderService.createOrder(orderData);
      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error) {
      // Return validation errors with 400 status
      if (error.message.includes('required') || error.message.includes('Invalid') || error.message.includes('must be')) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = {};
      
      if (req.body.status !== undefined) updateData.status = req.body.status;
      if (req.body.notes !== undefined) updateData.notes = req.body.notes;

      const order = await this.productOrderService.updateOrder(id, updateData);
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.productOrderService.deleteOrder(id);
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
      });
    } catch (error) {
      if (error.message.includes('required') || error.message.includes('Invalid')) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  };
}

export default ProductOrderController;
