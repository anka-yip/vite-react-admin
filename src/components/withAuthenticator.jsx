import { useState, useEffect } from "react";
import useEndeavour from "../hooks/useEndeavour";

function withAuthenticator(wrappedComponent) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { instance } = useEndeavour();

  useEffect(() => {
    const validate = () => {
      setLoading(true);
      axios
        .post("https://endeavour.paymentasia.com/oauth2.0/me")
        .then((data) => {})
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    };

    validate();
  }, [authenticated]);

  if (loading) {
    // loading here
  }

  if (!authenticated) {
    return;
  }

  if (authenticated) {
    return wrappedComponent;
  }
}
