"""
Authentication views using function-based approach.

Provides endpoints for user registration, login, and profile management
following the architecture standards with @api_view decorators.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from ..serializers.auth_serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
)


def get_tokens_for_user(user):
    """
    Generate JWT tokens for a user.
    
    Args:
        user: User instance.
    
    Returns:
        dict: Dictionary with access and refresh tokens.
    """
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Register a new user account.
    
    Endpoint: POST /api/auth/register/
    
    Request body:
        - email: User email address
        - password: User password (min 8 characters)
        - password_confirm: Password confirmation
        - first_name: Optional first name
        - last_name: Optional last name
        - phone: Optional phone number
    
    Returns:
        201: User created successfully with tokens
        400: Validation errors
    """
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        
        return Response({
            'message': 'User registered successfully',
            'user': UserProfileSerializer(user).data,
            'tokens': tokens
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'error': 'Registration failed',
        'details': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Authenticate user and return JWT tokens.
    
    Endpoint: POST /api/auth/login/
    
    Request body:
        - email: User email address
        - password: User password
    
    Returns:
        200: Login successful with tokens
        400: Invalid credentials
    """
    serializer = UserLoginSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        tokens = get_tokens_for_user(user)
        
        return Response({
            'message': 'Login successful',
            'user': UserProfileSerializer(user).data,
            'tokens': tokens
        }, status=status.HTTP_200_OK)
    
    return Response({
        'error': 'Login failed',
        'details': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """
    Get authenticated user's profile.
    
    Endpoint: GET /api/auth/profile/
    
    Returns:
        200: User profile data
        401: Not authenticated
    """
    serializer = UserProfileSerializer(request.user, context={'request': request})
    return Response({
        'user': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """
    Update authenticated user's profile.
    
    Endpoint: PUT/PATCH /api/auth/profile/update/
    
    Request body (all optional):
        - first_name: User first name
        - last_name: User last name
        - phone: Phone number
        - avatar: Profile picture file
    
    Returns:
        200: Profile updated successfully
        400: Validation errors
    """
    partial = request.method == 'PATCH'
    serializer = UserProfileSerializer(
        request.user,
        data=request.data,
        partial=partial,
        context={'request': request}
    )
    
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Profile updated successfully',
            'user': UserProfileSerializer(user, context={'request': request}).data
        }, status=status.HTTP_200_OK)
    
    return Response({
        'error': 'Update failed',
        'details': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)
