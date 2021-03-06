# Generated by Django 3.1.4 on 2020-12-16 04:35

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tracker',
            fields=[
                ('req_ip', models.CharField(max_length=30)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('origin_url', models.URLField(max_length=500)),
                ('request_tracking_code', models.CharField(blank=True, max_length=30)),
                ('request_managing_code', models.CharField(blank=True, max_length=30)),
                ('tracker_url', models.URLField(blank=True, max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('origin_ip', models.CharField(blank=True, max_length=30, null=True)),
                ('origin_country', models.CharField(blank=True, max_length=150, null=True)),
                ('timezone', models.CharField(blank=True, max_length=250, null=True)),
                ('device_gpu', models.CharField(blank=True, max_length=250, null=True)),
                ('user_os', models.CharField(blank=True, max_length=150, null=True)),
                ('user_state', models.CharField(blank=True, max_length=150, null=True)),
                ('user_city', models.CharField(blank=True, max_length=150, null=True)),
                ('user_language', models.CharField(blank=True, max_length=150, null=True)),
                ('user_isp', models.CharField(blank=True, max_length=150, null=True)),
                ('user_ua', models.CharField(blank=True, max_length=350, null=True)),
                ('request_api_ip', models.CharField(blank=True, max_length=150, null=True)),
                ('user_screensize', models.CharField(blank=True, max_length=150, null=True)),
                ('tracker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='excavator.tracker')),
            ],
        ),
    ]
