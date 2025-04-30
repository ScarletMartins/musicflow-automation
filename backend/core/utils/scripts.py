import os


def listar_scripts_fake():
    base_dir = os.path.join(os.path.dirname(__file__), "../scripts/fake")
    scripts = []
    for nome in os.listdir(base_dir):
        if nome.endswith(".py"):
            scripts.append(f"python core/scripts/fake/{nome}")
    return sorted(scripts)
