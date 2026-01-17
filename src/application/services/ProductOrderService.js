export class ProductOrderService {
  constructor(productOrderRepository) {
    this.productOrderRepository = productOrderRepository;
  }

  async getAllOrders() {
    return await this.productOrderRepository.getAll();
  }

  async getOrderById(id) {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }
    return await this.productOrderRepository.findById(id);
  }

  validateOrderData(data) {
    const errors = [];

    // Validate name
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Name is required');
    } else {
      const name = data.name.trim();
      if (name.length < 2) {
        errors.push('Name must be at least 2 characters long');
      }
      if (name.length > 100) {
        errors.push('Name must be less than 100 characters');
      }
      if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(name)) {
        errors.push('Name must contain only letters and spaces');
      }
    }

    // Validate phone
    if (!data.phone || typeof data.phone !== 'string' || data.phone.trim().length === 0) {
      errors.push('Phone number is required');
    } else {
      const cleanPhone = data.phone.replace(/[\s-]/g, '');
      if (!/^\d+$/.test(cleanPhone)) {
        errors.push('Phone number must contain only digits');
      }
      if (cleanPhone.length < 7) {
        errors.push('Phone number is too short (minimum 7 digits)');
      }
      if (cleanPhone.length > 15) {
        errors.push('Phone number is too long (maximum 15 digits)');
      }
    }

    // Validate countryCode
    if (data.countryCode) {
      const validCountryCodes = ['+962', '+971', '+966', '+965', '+974', '+973', '+968'];
      if (!validCountryCodes.includes(data.countryCode)) {
        errors.push('Invalid country code');
      }
    }

    // Validate email (optional but must be valid if provided)
    if (data.email) {
      if (typeof data.email !== 'string') {
        errors.push('Email must be a string');
      } else {
        const email = data.email.trim();
        if (email.length > 255) {
          errors.push('Email is too long (maximum 255 characters)');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.push('Invalid email format');
        }
      }
    }

    // Validate message (optional but must be within limits if provided)
    if (data.message) {
      if (typeof data.message !== 'string') {
        errors.push('Message must be a string');
      } else {
        const message = data.message.trim();
        if (message.length > 1000) {
          errors.push('Message must be less than 1000 characters');
        }
      }
    }

    // Validate productId (optional but must be valid UUID if provided)
    if (data.productId) {
      if (typeof data.productId !== 'string' || data.productId.trim().length === 0) {
        errors.push('Product ID must be a valid string');
      }
      // UUID v4 format validation
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(data.productId)) {
        errors.push('Product ID must be a valid UUID');
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }
  }

  async createOrder(data) {
    // Validate the order data
    this.validateOrderData(data);

    // Clean and prepare data
    const orderData = {
      productId: data.productId && data.productId.trim() ? data.productId.trim() : null,
      name: data.name.trim(),
      phone: data.phone.replace(/[\s-]/g, ''), // Remove spaces and dashes
      countryCode: data.countryCode || '+971',
      email: data.email && data.email.trim() ? data.email.trim() : null,
      message: data.message && data.message.trim() ? data.message.trim() : null,
      status: 'pending',
    };

    return await this.productOrderRepository.create(orderData);
  }

  async updateOrder(id, data) {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }

    const updateData = {};
    
    // Validate status if provided
    if (data.status !== undefined) {
      const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
      if (!validStatuses.includes(data.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      updateData.status = data.status;
    }

    // Validate notes if provided
    if (data.notes !== undefined) {
      if (typeof data.notes !== 'string') {
        throw new Error('Notes must be a string');
      }
      if (data.notes.trim().length > 1000) {
        throw new Error('Notes must be less than 1000 characters');
      }
      updateData.notes = data.notes.trim() || null;
    }

    return await this.productOrderRepository.update(id, updateData);
  }

  async deleteOrder(id) {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }
    return await this.productOrderRepository.delete(id);
  }
}

export default ProductOrderService;
