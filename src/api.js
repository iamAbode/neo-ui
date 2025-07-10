const baseUrl = "http://localhost:9090/api";

export async function getToken(username, password) {
  const response = await fetch(`${baseUrl}/identity/generateToken`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function createAccount(customerID, initialCredit) {
  const response = await fetch(`${baseUrl}/account/create`, {
    method: "POST",
    body: JSON.stringify({ customerID, initialCredit }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  return data.data;
}

export async function getCustomerInformation(customerId) {
  const response = await fetch(
    `${baseUrl}/customer/customer-information?customerId=${customerId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const data = await response.json();
  return data.data;
}
