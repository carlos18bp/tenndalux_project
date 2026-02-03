import pytest

from core_app.models import Category, HomePage, LeadStatus, Project, Space, Style, Tag
from core_app.serializers import LeadSerializer, HomePageSerializer, PostSerializer, ProjectSerializer


@pytest.mark.django_db
def test_project_serializer_writes_m2m_ids():
    cat_1 = Category.objects.create(name='Residential')
    cat_2 = Category.objects.create(name='Commercial')
    style_1 = Style.objects.create(name='Modern')
    space_1 = Space.objects.create(name='Kitchen')

    serializer = ProjectSerializer(
        data={
            'title': 'Project One',
            'category_ids': [cat_1.id, cat_2.id],
            'style_ids': [style_1.id],
            'space_ids': [space_1.id],
            'is_published': True,
        }
    )

    assert serializer.is_valid(), serializer.errors
    project = serializer.save()

    assert project.categories.count() == 2
    assert project.styles.count() == 1
    assert project.spaces.count() == 1

    data = ProjectSerializer(project).data
    assert len(data['categories']) == 2
    assert len(data['styles']) == 1
    assert len(data['spaces']) == 1


@pytest.mark.django_db
def test_post_serializer_writes_tag_ids_and_sets_published_at():
    tag = Tag.objects.create(name='Design')

    serializer = PostSerializer(
        data={
            'title': 'My Post',
            'tag_ids': [tag.id],
            'is_published': True,
        }
    )

    assert serializer.is_valid(), serializer.errors
    post = serializer.save()

    assert post.tags.count() == 1
    assert post.published_at is not None


@pytest.mark.django_db
def test_lead_serializer_writes_relation_ids():
    category = Category.objects.create(name='Remodel')
    space = Space.objects.create(name='Bathroom')
    status = LeadStatus.objects.create(name='New', color='#00ff00', order=0)

    serializer = LeadSerializer(
        data={
            'full_name': 'John Doe',
            'email': 'john@example.com',
            'project_type_id': category.id,
            'space_type_ids': [space.id],
            'status_id': status.id,
            'message': 'Hello',
        }
    )

    assert serializer.is_valid(), serializer.errors
    lead = serializer.save()

    assert lead.project_type_id == category.id
    assert lead.space_types.count() == 1
    assert lead.status_id == status.id


@pytest.mark.django_db
def test_home_page_serializer_writes_featured_project_ids():
    project = Project.objects.create(title='Featured', is_published=True)
    home = HomePage.load()

    serializer = HomePageSerializer(home, data={'featured_project_ids': [project.id]}, partial=True)
    assert serializer.is_valid(), serializer.errors
    obj = serializer.save()

    assert obj.featured_projects.count() == 1
    assert obj.featured_projects.first().id == project.id
