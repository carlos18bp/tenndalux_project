# Management Commands

Esta carpeta contiene comandos personalizados de Django siguiendo el patrón arquitectural del proyecto.

---

## 📦 Arquitectura: Un Comando por Modelo

Cada modelo tiene su **propio archivo** de comando para crear datos fake:

```
commands/
├── create_fake_data.py         # 🎯 COMANDO MAESTRO (orquestador)
├── create_fake_users.py        # ✅ Comando para Users
├── create_fake_products.py     # 🔜 Comando para Products (crear cuando sea necesario)
├── create_fake_orders.py       # 🔜 Comando para Orders (crear cuando sea necesario)
└── delete_fake_data.py         # 🗑️ Limpieza de todos los datos
```

---

## 🎯 Comando Maestro: `create_fake_data.py`

El comando maestro **orquesta** todos los comandos individuales:

- ✅ Llama a cada comando en el orden correcto
- ✅ Respeta las dependencias entre modelos
- ✅ Permite configurar cantidades y parámetros
- ✅ Permite skip de entidades específicas

**Ejemplo:**
```bash
python manage.py create_fake_data --users 50 --password testpass
```

---

## 📝 Comandos Individuales

### `create_fake_users.py`
Crea usuarios fake con datos realistas (nombres, emails, teléfonos).

**Uso:**
```bash
python manage.py create_fake_users --num 20 --password password123
```

**Características:**
- Genera emails únicos
- Password configurable
- 90% usuarios activos
- Usa Faker para datos realistas

---

### `delete_fake_data.py`
Elimina todos los datos fake de forma segura.

**Uso:**
```bash
# Preview (no elimina nada)
python manage.py delete_fake_data

# Eliminar (requiere --confirm)
python manage.py delete_fake_data --confirm
```

**Protecciones:**
- ✅ No elimina superusers
- ✅ No elimina emails protegidos (admin@tenndalux.com, etc.)
- ✅ Elimina en orden inverso de dependencias

---

## 🔧 Agregar un Nuevo Modelo

Cuando crees un nuevo modelo (ej: `Product`):

### 1. Crear el comando individual

Crea `create_fake_products.py`:

```python
"""
Command to generate fake product data.

Usage:
    python manage.py create_fake_products --num 50
"""
from django.core.management.base import BaseCommand
from faker import Faker
from core_app.models import Product

class Command(BaseCommand):
    help = 'Create fake products'
    
    def __init__(self):
        super().__init__()
        self.fake = Faker()
    
    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=50)
    
    def handle(self, *args, **options):
        num_products = options['num']
        self.stdout.write(f'Creating {num_products} fake products...')
        
        created_count = 0
        for i in range(num_products):
            product = self._create_product()
            if product:
                created_count += 1
        
        self.stdout.write(self.style.SUCCESS(
            f'✅ Created {created_count} products'
        ))
    
    def _create_product(self):
        return Product.objects.create(
            name=self.fake.company(),
            price=self.fake.random_int(10, 1000),
            # ... más campos
        )
```

### 2. Agregar al comando maestro

Edita `create_fake_data.py`:

```python
def add_arguments(self, parser):
    # ... existing args ...
    parser.add_argument('--products', type=int, default=50)
    parser.add_argument('--skip-products', action='store_true')

def handle(self, *args, **options):
    # ... existing code ...
    
    if not options['skip_products']:
        self.stdout.write('🛍️  Creating products...')
        call_command('create_fake_products', num=options['products'])
```

### 3. Agregar al delete

Edita `delete_fake_data.py`:

```python
def handle(self, *args, **options):
    # ... existing code ...
    
    self.stdout.write('🛍️  Deleting products...')
    count = Product.objects.all().delete()[0]
    self.stdout.write(f'   Deleted {count} products')
```

---

## 📊 Orden de Dependencias

### Creación (menos → más dependencias)

```
1. Users         (independiente)
2. Categories    (independiente)
3. Products      (depende de Category)
4. Orders        (depende de User)
5. OrderItems    (depende de Order + Product)
```

### Eliminación (inverso)

```
1. OrderItems    (más dependencias)
2. Orders
3. Products
4. Categories
5. Users         (independiente, PROTEGIDOS)
```

---

## 🚨 Reglas Importantes

### ✅ DO's

- ✅ Un archivo por modelo
- ✅ Documentar dependencias en DocString
- ✅ Validar dependencias antes de crear
- ✅ Usar Faker para datos realistas
- ✅ Incluir progress logs cada 10 items
- ✅ Respetar orden de dependencias
- ✅ Proteger registros críticos en delete

### ❌ DON'Ts

- ❌ No hardcodear datos
- ❌ No crear sin validar dependencias
- ❌ No ignorar el orden (causa errores FK)
- ❌ No eliminar superusers
- ❌ No mezclar entidades en un comando

---

## 📚 Documentación Completa

Ver guía detallada con ejemplos completos en:
**`/backend/docs/FAKE_DATA_COMMANDS.md`**

---

## 🧪 Testing

```bash
# Test 1: Crear con defaults
python manage.py create_fake_data

# Test 2: Crear individual
python manage.py create_fake_users --num 5

# Test 3: Skip
python manage.py create_fake_data --skip-users

# Test 4: Preview delete
python manage.py delete_fake_data

# Test 5: Delete confirmado
python manage.py delete_fake_data --confirm
```

---

**Última actualización:** Febrero 2026
