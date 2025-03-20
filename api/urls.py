from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token  # ✅ Ajoute cet import
from .views import ExerciceViewSet, SoumissionViewSet, CorrectionIAAPIView, UserProfileView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('exercices', ExerciceViewSet, basename='exercice')
router.register('soumissions', SoumissionViewSet, basename='soumission')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', obtain_auth_token, name='api-token-auth'),  # ✅ Token authentication
    path('correction-ia/', CorrectionIAAPIView.as_view(), name='correction-ia'),
    path('users/me/', UserProfileView.as_view(), name='user-profile'),  # ✅ Ajoute cette route
]

