const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const app = express();
const port = 9001;
const { uuid } = require('uuidv4');

// setup middleware
app.use(bodyParser.json());
app.use(cors());

//
var _dishes = [
  {
    id: 0,
    productName: 'Fresh Avocados',
    image: '🥑🥑',
    category: 'Side dish',
    from: 'Spain',
    nutrients: 'Vitamin B, Vitamin K',
    price: '6.50',
    description:
      "A ripe avocado yields to gentle pressure when held in the palm of the hand and squeezed. The fruit is not sweet, but distinctly and subtly flavored, with smooth texture. The avocado is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content. Generally, avocado is served raw, though some cultivars, including the common 'Hass', can be cooked for a short time without becoming bitter. It is used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices.",
  },
  {
    id: 1,
    productName: 'Goat and Sheep Cheese',
    image: '🧀🧀',
    category: 'Main dish',
    from: 'Portugal',
    nutrients: 'Vitamin A, Calcium',
    price: '5.00',
    description:
      'Creamy and distinct in flavor, goat cheese is a dairy product enjoyed around the world. Goat cheese comes in a wide variety of flavors and textures, from soft and spreadable fresh cheese to salty, crumbly aged cheese. Although it’s made using the same coagulation and separation process as cheese made from cow’s milk, goat cheese differs in nutrient content.',
  },
  {
    id: 2,
    productName: 'Apollo Broccoli',
    image: '🥦🥦',
    category: 'Main dish',
    from: 'Portugal',
    nutrients: 'Vitamin C, Vitamin K',
    price: '5.50',
    description:
      'Broccoli is known to be a hearty and tasty vegetable which is rich in dozens of nutrients. It is said to pack the most nutritional punch of any vegetable. When we think about green vegetables to include in our diet, broccoli is one of the foremost veggies to come to our mind. Broccoli is a cruciferous vegetable and part of the cabbage family, which includes vegetables such as Brussel sprouts and kale. Although the tastes are different, broccoli and these other vegetables are from the same family.',
  },
  {
    id: 3,
    productName: 'Baby Carrots',
    image: '🥕🥕',
    category: 'Side dish',
    from: 'France',
    nutrients: 'Vitamin A, Vitamin K',
    price: '3.00',
    description:
      'The carrot is a root vegetable that is often claimed to be the perfect health food. It is crunchy, tasty and highly nutritious. Carrots are a particularly good source of beta-carotene, fiber, vitamin K, potassium and antioxidants. Carrots have a number of health benefits. They are a weight loss friendly food and have been linked to lower cholesterol levels and improved eye health.',
  },
  {
    id: 4,
    productName: 'Sweet Corncobs',
    image: '🌽🌽',
    category: 'Main dish',
    from: 'Germany',
    nutrients: 'Vitamin C, Magnesium',
    price: '2.00',
    description:
      'Also known as maize, corn is one of the most popular cereal grains in the world. Popcorn and sweet corn are commonly eaten varieties, but refined corn products are also widely consumed, frequently as ingredients in foods. These include tortillas, tortilla chips, polenta, cornmeal, corn flour, corn syrup, and corn oil. Whole-grain corn is as healthy as any cereal grain, rich in fiber and many vitamins, minerals, and antioxidants.',
  },
];

// get dishes
router.get('/dishes', (req, res) => {
  res.json({
    status: 'OK',
    data: _dishes,
  });
});

// clear dishes
router.get('/dishes/clear', (req, res) => {
  _dishes = [];

  res.json({
    status: 'OK',
  });
});

// get dish by id
router.get('/dishes/:_id', (req, res) => {
  const dish = _dishes.find((x) => x._id === req.params._id);

  res.json({
    status: 'OK',
    data: dish ? dish : null,
  });
});

// insert/update dish
router.put('/dishes', (req, res) => {
  if (req.body == null) {
    res.json({
      status: 'Failed',
      message: 'No content provided',
    });
  } else {
    let dish = req.body,
      status = 'OK';

    if (!dish._id) {
      //
      dish._id = uuid();
      dish._Created = new Date();
      dish._Changed = null;

      //
      _dishes.push(dish);
    } else {
      //
      const dishIndex = _dishes.findIndex((x) => x._id === dish._id);

      //
      if (dishIndex >= 0) {
        //
        dish._Changed = new Date();

        //
        _dishes[dishIndex] = dish;
      } else {
        //
        status = `dish not found for _id ${dish._id}`;
      }
    }

    res.json({
      status: status,
      data: dish,
    });
  }
});

// delete dish
router.delete('/dishes/:_id', (req, res) => {
  let dishIndex = _dishes.findIndex((x) => x._id === req.params._id);

  if (dishIndex !== -1) {
    _dishes.splice(dishIndex, 1);
  }

  res.json({
    status: 'OK',
    message: dishIndex !== -1 ? 'Dish deleted' : 'Dish not found',
  });
});

//
app.use(router);

//
app.listen(port, () => {
  console.log(`api is ready on http://localhost:${port}`);
});
