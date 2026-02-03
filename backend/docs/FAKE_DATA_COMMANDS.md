# Fake Data Commands - Guía de Uso

Esta guía explica cómo usar y extender el sistema de comandos de fake data siguiendo el patrón arquitectural del proyecto.

---

## 🏗️ Arquitectura de Comandos

### Principio: Un Comando por Modelo

Cada modelo de Django tiene su **propio comando** para generar datos fake:

```
core_app/management/commands/
├── create_fake_data.py         # Comando MAESTRO (orquestador)
├── create_fake_users.py        # Comando para Users
├── create_fake_products.py     # Comando para Products (ejemplo)
├── create_fake_orders.py       # Comando para Orders (ejemplo)
└── delete_fake_data.py         # Limpieza de todos los datos
```

### Comando Maestro

El comando `create_fake_data.py` **orquesta** todos los comandos individuales:
- Llama a cada comando en el orden correcto
- Respeta las dependencias entre modelos
- Permite configurar cantidades y parámetros
- Permite skip de entidades específicas

---

## 📦 Uso Básico

### Crear Todos los Datos Fake

```bash
# Usar valores por defecto
python manage.py create_fake_data

# Personalizar cantidades
python manage.py create_fake_data --users 50

# Con password personalizado
python manage.py create_fake_data --users 30 --password testpass123
```

### Crear Solo un Tipo de Entidad

```bash
# Solo usuarios
python manage.py create_fake_users --num 20

# Solo productos (cuando exista)
python manage.py create_fake_products --num 100
```

### Skip de Entidades Específicas

```bash
# Crear todo excepto usuarios
python manage.py create_fake_data --skip-users

# Útil cuando ya tienes usuarios y solo quieres agregar productos
python manage.py create_fake_data --skip-users --products 50
```

### Eliminar Todos los Datos Fake

```bash
# Vista previa (no elimina nada)
python manage.py delete_fake_data

# Confirmación requerida para eliminar
python manage.py delete_fake_data --confirm
```

---

## 🔧 Agregar un Nuevo Modelo

Cuando crees un nuevo modelo (ej: `Product`), sigue estos pasos:

### Paso 1: Crear el Comando Individual

Crea `/backend/core_app/management/commands/create_fake_products.py`:

```python
"""
Command to generate fake product data for development and testing.

This command creates realistic product records with:
- Bilingual content (English/Spanish)
- Random pricing and stock levels
- Association with existing categories (if any)

Dependencies:
    - None (if independent) OR
    - Category model must have existing records (if dependent)

Usage:
    python manage.py create_fake_products --num 50
    python manage.py create_fake_products --num 100
"""
import random
from decimal import Decimal
from django.core.management.base import BaseCommand
from faker import Faker

from core_app.models import Product
# from core_app.models import Category  # If has dependencies


class Command(BaseCommand):
    help = 'Create fake products with realistic data'
    
    def __init__(self):
        super().__init__()
        self.fake_en = Faker('en_US')
        self.fake_es = Faker('es_ES')
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--num',
            type=int,
            default=50,
            help='Number of products to create (default: 50)'
        )
    
    def handle(self, *args, **options):
        num_products = options['num']
        
        # Validate dependencies (if any)
        # categories = list(Category.objects.all())
        # if not categories:
        #     self.stdout.write(self.style.ERROR(
        #         'No categories found. Run create_fake_categories first.'
        #     ))
        #     return
        
        self.stdout.write(f'Creating {num_products} fake products...')
        
        created_count = 0
        for i in range(num_products):
            product = self._create_product()  # Pass dependencies if needed
            if product:
                created_count += 1
                if created_count % 10 == 0:
                    self.stdout.write(f'  Created {created_count} products...')
        
        self.stdout.write(self.style.SUCCESS(
            f'✅ Successfully created {created_count} products'
        ))
    
    def _create_product(self):
        """
        Create a single product with randomized data.
        
        Returns:
            Product: The created product instance.
        """
        # Generate bilingual product name
        product_type = random.choice([
            'Laptop', 'Phone', 'Tablet', 'Headphones', 'Camera'
        ])
        brand = self.fake_en.company()
        
        name_en = f'{brand} {product_type} {self.fake_en.word().title()}'
        name_es = f'{product_type} {brand} {self.fake_es.word().title()}'
        
        # Generate descriptions
        desc_en = self.fake_en.paragraph(nb_sentences=3)
        desc_es = self.fake_es.paragraph(nb_sentences=3)
        
        # Generate realistic pricing
        base_price = random.choice([29.99, 49.99, 99.99, 149.99, 299.99])
        price = Decimal(str(base_price)) + Decimal(random.randint(0, 50))
        
        # Create product
        product = Product.objects.create(
            name_en=name_en,
            name_es=name_es,
            description_en=desc_en,
            description_es=desc_es,
            price=price,
            stock=random.randint(0, 100),
            is_active=random.random() > 0.1,  # 90% active
            # category=random.choice(categories),  # If has dependencies
        )
        
        return product
```

### Paso 2: Agregar al Comando Maestro

Edita `create_fake_data.py` y agrega tu modelo:

```python
def add_arguments(self, parser):
    # ... existing args ...
    
    # Products (NEW)
    parser.add_argument(
        '--products',
        type=int,
        default=50,
        help='Number of products to create (default: 50)'
    )
    parser.add_argument(
        '--skip-products',
        action='store_true',
        help='Skip product creation'
    )

def handle(self, *args, **options):
    # ... existing code ...
    
    # =========================================================================
    # PHASE 2: Entities with Single Dependency (NEW)
    # =========================================================================
    
    if not options['skip_products']:
        self.stdout.write('🛍️  Creating products...')
        try:
            call_command(
                'create_fake_products',
                num=options['products'],
                stdout=self.stdout
            )
            created_entities.append(f"✅ {options['products']} products")
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'   ❌ Error: {e}'))
    else:
        self.stdout.write(self.style.WARNING('   ⏭️  Skipped products'))
```

### Paso 3: Agregar al Delete

Edita `delete_fake_data.py`:

```python
def handle(self, *args, **options):
    # ... existing code ...
    
    # =========================================================================
    # PHASE 2: Entities with Single Dependency (NEW)
    # =========================================================================
    
    self.stdout.write('🛍️  Deleting products...')
    deleted_products = Product.objects.all().delete()
    deleted_count = deleted_products[0]
    deleted_summary.append(f"✅ {deleted_count} products")
    self.stdout.write(f'   Deleted {deleted_count} products')
```

---

## 📊 Diagrama de Dependencias

### Orden de Creación (menos → más dependencias)

```
┌─────────────────────────────────────────────┐
│  PHASE 1: Independent Entities              │
├─────────────────────────────────────────────┤
│  [User] ──────────────┐                     │
│  [Category] ──────┐   │                     │
└───────────────────┼───┼─────────────────────┘
                    │   │
┌───────────────────┼───┼─────────────────────┐
│  PHASE 2: Single Dependency                 │
├───────────────────┼───┼─────────────────────┤
│             [Product] ◄┘                    │
│                  │                           │
└──────────────────┼───────────────────────────┘
                   │
┌──────────────────┼───────────────────────────┐
│  PHASE 3: Multiple Dependencies             │
├──────────────────┼───────────────────────────┤
│            [Order] ◄── [User]               │
│               │                              │
│         [OrderItem] ◄── [Product]           │
└──────────────────────────────────────────────┘
```

### Orden de Eliminación (inverso - más → menos dependencias)

```
1. OrderItem   (depende de Order + Product)
2. Order       (depende de User)
3. Review      (depende de User + Product)
4. Product     (depende de Category)
5. Category    (independiente)
6. User        (independiente, PROTEGER admins)
```

---

## 🚨 Reglas Importantes

### ✅ DO's

- ✅ **Un archivo por modelo** en `commands/`
- ✅ **Documentar dependencias** en el DocString
- ✅ **Validar dependencias** antes de crear datos
- ✅ **Usar Faker** para datos realistas
- ✅ **Incluir contenido bilingüe** (en/es) cuando aplique
- ✅ **Agregar progress logs** cada 10 items
- ✅ **Respetar el orden** de dependencias
- ✅ **Proteger registros críticos** en delete

### ❌ DON'Ts

- ❌ **No hardcodear datos** - usar Faker
- ❌ **No crear sin validar** dependencias
- ❌ **No ignorar el orden** - causa errores FK
- ❌ **No eliminar superusers** - protegerlos
- ❌ **No mezclar entidades** en un comando

---

## 📝 Templates de Comandos

### Template: Modelo Independiente

```python
"""
Command to generate fake <Entity> data.

No dependencies required.

Usage:
    python manage.py create_fake_<entities> --num 50
"""
from django.core.management.base import BaseCommand
from faker import Faker
from core_app.models import <Entity>

class Command(BaseCommand):
    help = 'Create fake <entities>'
    
    def __init__(self):
        super().__init__()
        self.fake = Faker()
    
    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=50)
    
    def handle(self, *args, **options):
        num_items = options['num']
        self.stdout.write(f'Creating {num_items} fake <entities>...')
        
        created_count = 0
        for i in range(num_items):
            item = self._create_item()
            if item:
                created_count += 1
        
        self.stdout.write(self.style.SUCCESS(
            f'✅ Created {created_count} <entities>'
        ))
    
    def _create_item(self):
        return <Entity>.objects.create(
            name=self.fake.word(),
            # ... more fields
        )
```

### Template: Modelo con Dependencias

```python
"""
Command to generate fake <Entity> data.

Dependencies:
    - <Dependency> model must have existing records

Usage:
    python manage.py create_fake_<entities> --num 50
"""
from django.core.management.base import BaseCommand
from faker import Faker
from core_app.models import <Entity>, <Dependency>

class Command(BaseCommand):
    help = 'Create fake <entities>'
    
    def __init__(self):
        super().__init__()
        self.fake = Faker()
    
    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=50)
    
    def handle(self, *args, **options):
        # Validate dependencies
        dependencies = list(<Dependency>.objects.all())
        if not dependencies:
            self.stdout.write(self.style.ERROR(
                'No <dependencies> found. Run create_fake_<dependencies> first.'
            ))
            return
        
        num_items = options['num']
        self.stdout.write(f'Creating {num_items} fake <entities>...')
        
        created_count = 0
        for i in range(num_items):
            item = self._create_item(dependencies)
            if item:
                created_count += 1
        
        self.stdout.write(self.style.SUCCESS(
            f'✅ Created {created_count} <entities>'
        ))
    
    def _create_item(self, dependencies):
        import random
        return <Entity>.objects.create(
            name=self.fake.word(),
            dependency=random.choice(dependencies),
            # ... more fields
        )
```

---

## 🧪 Testing de Comandos

```bash
# Test 1: Crear con defaults
python manage.py create_fake_data

# Test 2: Verificar creación individual
python manage.py create_fake_users --num 5

# Test 3: Verificar skip
python manage.py create_fake_data --skip-users

# Test 4: Preview delete (no elimina)
python manage.py delete_fake_data

# Test 5: Delete real
python manage.py delete_fake_data --confirm

# Test 6: Verificar que usuarios protegidos NO se borran
python manage.py delete_fake_data --confirm
# Luego verificar que admin@tenndalux.com sigue existiendo
```

---

## 📚 Ejemplos Completos

Ver ejemplos reales en:
- `/backend/core_app/management/commands/create_fake_users.py`
- `/backend/core_app/management/commands/create_fake_data.py`
- `/backend/core_app/management/commands/delete_fake_data.py`

---

## 🔗 Referencias

- Django Management Commands: https://docs.djangoproject.com/en/stable/howto/custom-management-commands/
- Faker Documentation: https://faker.readthedocs.io/
- Guía de Arquitectura: `/ARCHITECTURE_GUIDE.md` (Sección 2.8)

---

**Última actualización:** Febrero 2026
