// Assuming Node.js version 15 or above:

// Dynamic Import (Recommended for Node.js v15 and above):
const mocha = require('mocha')
async function loadChai() {
    const { expect } = await import('chai');
    // Use expect for assertions here
  }
  
  loadChai(); // Call the function to load Chai dynamically
  
  // If Node.js version is below 15, consider an alternative solution:
  // (e.g., upgrade Node.js, convert unit.js to ESM, or use a different test runner)
  
  const sinon = require('sinon');
  const { addToCart } = require('../Controllers/cart');
  
  mocha.describe('addToCart', () => {
    it('should add product to the cart', async () => {
      const userId = 'userId';
      const productId = 'productId';
      const days = 5;
  
      const req = {
        user: { id: userId },
        query: { productId },
        body: { days },
      };
  
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      const customerModel = {
        findOne: sinon.stub().resolves({ cart: [] }),
        save: sinon.stub().resolves({ cart: [{ id: productId, quantity: 1, date: Date.now(), days }] }),
      };
  
      sinon.replace(Customer, 'findOne', customerModel.findOne);
      sinon.replace(Customer, 'save', customerModel.save);
  
      await addToCart(req, res);
  
      expect(customerModel.findOne.calledOnceWith({ user: userId })).to.be.true;
      expect(customerModel.save.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({
        status: 'success',
        data: [{ id: productId, quantity: 1, date: Date.now(), days }],
      })).to.be.true;
  
      sinon.restore(); // Restores all stubs and replaces
    });
  });
  