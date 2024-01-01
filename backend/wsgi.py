from main import api as application
import os

if __name__ == "__main__":
    # NOTE - These should default to None unless we're
    # running in  a dev environment
    host_ = os.environ.get("DEV__HOST")
    port_ = os.environ.get("DEV__PORT")

    application.run(host=host_, port=port_)
