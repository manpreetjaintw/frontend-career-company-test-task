from calculator_api.views import EvaluateExpression
import unittest
from rest_framework import status


class EvaluateExpressionTest(unittest.TestCase):
    def setUp(self):
        # Create an instance of the EvaluateExpression class
        self.evaluate_expression = EvaluateExpression()

    # Test case for a valid expression
    def test_valid_expression(self):
        request = type('Request', (), {'data': {'expression': '1' '+' '2'}})
        response = self.evaluate_expression.post(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['result'], 3)

    # Test case for an invalid expression
    def test_invalid_expression(self):
        request = type('Request', (), {'data': {'expression': '1 + a'}})
        response = self.evaluate_expression.post(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid expression')

    # Test case for missing expression
    def test_missing_expression(self):
        request = type('Request', (), {'data': {}})
        response = self.evaluate_expression.post(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Expression not provided')

    # Test case for a long expression
    def test_long_expression(self):
        request = type('Request', (), {'data': {'expression': '1 + 2 + 3'}})
        response = self.evaluate_expression.post(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid expression')


# Entry point to run the tests
if __name__ == '__main__':
    unittest.main()
