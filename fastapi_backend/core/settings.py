from decouple import config


def get_db_credentials():
    settings={
        'POSTGRES_USER':config("POSTGRES_USER"),
        'POSTGRES_PASSWORD':config("POSTGRES_PASSWORD"),
        'POSTGRES_SERVER':config("POSTGRES_SERVER"),
        'POSTGRES_PORT':config("POSTGRES_PORT"),
        'POSTGRES_DB':config("POSTGRES_DB"),
        }
    return settings


def get_email_credentials():
    settings={
        'MAIL_FROM': config("MAIL_FROM"),
        'BASE_URL': config("BASE_URL"),
        'SENDGRID_API_KEY': config("SENDGRID_API_KEY"),
        'PASSWORD_RESET_TEMPLATE': config("PASSWORD_RESET_TEMPLATE"),
        'EMAIL_VERIFICATION_TEMPLATE': config("EMAIL_VERIFICATION_TEMPLATE"),
        }
    return settings


def get_mongo_settings():
    settings={
        'MONGO':config("MONGO")
    }

    return settings