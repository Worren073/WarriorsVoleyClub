import random
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.athletes.models import Category, Athlete
from apps.payments.models import PaymentPlan, Payment
from apps.schedules.models import Court, Schedule
from apps.competitions.models import Competition, Match, Standing

User = get_user_model()

class Command(BaseCommand):
    help = 'Populates the database with seed data for testing.'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')

        # 1. Users
        self.stdout.write('  - Creating users...')
        admin, _ = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@guerrerosvc.com',
                'first_name': 'Admin',
                'last_name': 'Principal',
                'role': 'administrador',
                'is_staff': True,
                'is_superuser': True
            }
        )
        admin.set_password('Admin123!')
        admin.save()

        coach_mendez, _ = User.objects.get_or_create(
            username='coahmendez',
            defaults={
                'email': 'mendez@guerrerosvc.com',
                'first_name': 'Coach',
                'last_name': 'Méndez',
                'role': 'entrenador'
            }
        )
        coach_mendez.set_password('Coach123!')
        coach_mendez.save()

        # 2. Categories
        self.stdout.write('  - Creating categories...')
        categories_data = [
            ('U12', 'academia', 'Iniciación'),
            ('U14 Novato', 'novato', 'Básico'),
            ('U16 Competición', 'competicion', 'Intermedio'),
            ('U18 Academia', 'academia', 'Juvenil'),
            ('U20 Élite', 'elite', 'Alto Rendimiento'),
            ('Varsity Élite', 'elite', 'Máximo Nivel'),
        ]
        categories = []
        for name, level, desc in categories_data:
            cat, _ = Category.objects.get_or_create(name=name, level=level, defaults={'description': desc})
            categories.append(cat)

        # 3. Athletes
        self.stdout.write('  - Creating athletes...')
        athletes_names = [
            ('Martina', 'Rodriguez', 'GVC-4402', 'inscrito', 85),
            ('Carlos', 'Salazar', 'GVC-8911', 'periodo_prueba', 45),
            ('Elena', 'Mendez', 'GVC-1290', 'inscrito', 92),
            ('Sofia', 'Castillo', 'GVC-5521', 'suspendido', 0),
            ('Javier', 'Duarte', 'GVC-9002', 'inscrito', 78),
            ('Andres', 'Lopez', 'GVC-6632', 'inscrito', 65),
            ('Maria', 'Gomez', 'GVC-2231', 'inscrito', 88),
            ('Luis', 'Torres', 'GVC-7789', 'periodo_prueba', 30),
        ]
        athletes = []
        today = date.today()
        for first, last, aid, status, perf in athletes_names:
            ath, _ = Athlete.objects.get_or_create(
                athlete_id=aid,
                defaults={
                    'first_name': first,
                    'last_name': last,
                    'status': status,
                    'category': random.choice(categories),
                    'date_of_birth': date(2005 + random.randint(0, 10), random.randint(1, 12), random.randint(1, 28)),
                    'date_joined': today - timedelta(days=random.randint(30, 730)),
                    'performance': perf,
                    'created_by': admin
                }
            )
            athletes.append(ath)

        # 4. Payment Plans
        self.stdout.write('  - Creating payment plans...')
        plans_data = [
            ('Estandar Semanal', 85.00),
            ('Mensual Elite', 150.00),
            ('Mensual Academia', 120.00),
        ]
        plans = []
        for name, amt in plans_data:
            plan, _ = PaymentPlan.objects.get_or_create(name=name, defaults={'amount': amt})
            plans.append(plan)

        # 5. Payments
        self.stdout.write('  - Creating payments...')
        for athlete in athletes[:5]:
            status_choice = random.choice(['pagado', 'pendiente', 'atrasado'])
            Payment.objects.create(
                athlete=athlete,
                plan=random.choice(plans),
                amount=85.00 if random.random() > 0.5 else 150.00,
                status=status_choice,
                due_date=today + timedelta(days=random.randint(-5, 15)),
                payment_date=today if status_choice == 'pagado' else None,
                registered_by=admin
            )

        # 6. Courts
        self.stdout.write('  - Creating courts...')
        courts = [
            Court.objects.get_or_create(name='Cancha 01', defaults={'location': 'Salón Principal'})[0],
            Court.objects.get_or_create(name='Cancha 02', defaults={'location': 'Alto Rendimiento'})[0],
        ]

        # 7. Schedules
        self.stdout.write('  - Creating schedules...')
        Schedule.objects.get_or_create(
            title='U-14 JUVENILES',
            day_of_week=3,
            start_time='09:00:00',
            end_time='10:30:00',
            defaults={
                'category': categories[1],
                'court': courts[0],
                'coach': coach_mendez,
                'session_type': 'entrenamiento'
            }
        )
        Schedule.objects.get_or_create(
            title='VARSITY ÉLITE',
            day_of_week=5,
            start_time='11:00:00',
            end_time='12:30:00',
            defaults={
                'category': categories[5],
                'court': courts[1],
                'coach': coach_mendez,
                'session_type': 'entrenamiento'
            }
        )

        # 8. Competitions
        self.stdout.write('  - Creating competitions...')
        comp, _ = Competition.objects.get_or_create(
            name='Circuito Elite 2024 Fase 2',
            defaults={
                'competition_type': 'liga',
                'phase': 'regular',
                'start_date': date(2024, 10, 1),
                'location': 'Arena Central, Maporal',
                'is_featured': True
            }
        )

        Match.objects.get_or_create(
            competition=comp,
            home_team='Guerreros de Maporal',
            away_team='Titans VC',
            match_date=today + timedelta(days=10),
            defaults={
                'venue': 'Cancha Norte Maporal',
                'status': 'programado',
                'phase': 'cuartos'
            }
        )

        Standing.objects.get_or_create(
            competition=comp,
            team_name='Guerreros VC',
            defaults={'position': 1, 'points': 24, 'matches_played': 8, 'wins': 8, 'losses': 0}
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
