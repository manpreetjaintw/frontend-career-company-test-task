from django.urls import path
from .views import EvaluateExpression

urlpatterns = [
    path('calc/', EvaluateExpression.as_view(), name="eval_expression")
]