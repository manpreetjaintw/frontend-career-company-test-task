from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class EvaluateExpression(APIView):
    """
    A class-based API view that handle evaluation of arithmetic expressions.

    It only supports addition and subtraction operations with positive
    integers.
    Expressions must not be nested.
    """

    def post(self, request):
        """
        Handle POST requests to evaluate arithmetic expressions.

        Args:
            request: Request object containing the arithmetic expression.

        Returns:
            Response containing the result of the expression evaluation
            or an error message.

        """
        expression = request.data.get('expression', "")

        if expression:
            # Validating the expression
            if not self.is_valid_expression(expression):
                return Response(
                    {'error': 'Invalid Expression'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                # Evaluating the expression
                result = self.evaluate(expression)
                return Response({'result': result}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(
                        {'error': str(e)},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        else:
            return Response(
                {'error': 'Expression not provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def is_valid_expression(self, expression):
        """
        Validate the expression in various scenarios

        Args:
            expression (str): The arithmetic expression to validate.

        Returns:
            bool: True if the expression is valid, False otherwise.

        """
        # Check if the expression contains only allowed characters
        allowed_characters = set('0123456789+- ')
        if set(expression) - allowed_characters:
            return False

        # Check for nested expression
        if '(' in expression or ')' in expression:
            return False

        # Check if the expression starts or ends with an operator
        if expression[0] in ['+', '-'] or expression[-1] in ['+', '-']:
            return False

        # Check if there are consecutive operators
        if any(
            expression[i] in ['+', '-'] and expression[i+1] in ['+', '-']
            for i in range(len(expression)-1)
        ):
            return False

        if sum(1 for char in expression if char in ['+', '-']) != 1:
            return False

        return True

    def evaluate(self, expression):
        """
        Evaluate the arithmetic expression.

        Args:
            expression: The arithmetic expression to evaluate.

        Returns:
            int: The result of the expression evaluation.

        """
        # Evaluating the expression
        return eval(expression.replace(' ', ''))
