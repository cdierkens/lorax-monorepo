"""Hello unit test module."""

from lorax_server.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello lorax-server"
