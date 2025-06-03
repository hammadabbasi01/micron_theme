from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in micron_theme/__init__.py
from micron_theme import __version__ as version

setup(
	name="micron_theme",
	version=version,
	description="Micron Theme",
	author="Hammad",
	author_email="hammad@gskills.com.sa",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
