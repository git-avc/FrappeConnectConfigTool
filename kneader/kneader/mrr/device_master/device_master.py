# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
import requests
from frappe.model.document import Document

class DeviceMaster(Document):
    def on_update(self):
        # Check if the username and password match the criteria
        if self.username == 'admin' and self.password == 'admin@123':
            self.get_api_response()
        else:
            frappe.msgprint("Invalid username or password. API request not sent.")
    
    def get_api_response(self):
        # Define the URL
        url = "http://demo-site.in/school/tech.php?action=login"
        
        # Define the payload with username and password
        payload = {
            'username': 'admin',
            'password': 'admin@123'
        }
        
        # Define headers to mimic a browser request
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',  # Form data
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }

        try:
            # Send a POST request with the form-encoded payload and headers
            response = requests.post(url, data=payload, headers=headers)
            frappe.msgprint(f"Server responded with: {response.text}")

            # Check if the request was successful
            if response.status_code == 200:
                frappe.msgprint("Response received successfully!")
                frappe.msgprint(f"Response content: {response.text}")  # Print the response content in Frappe's message log
            else:
                frappe.msgprint(f"Failed to get a response. Status code: {response.status_code}")
                frappe.msgprint(f"Response content: {response.text}")  # Print the server's error response for debugging

        except requests.exceptions.RequestException as e:
            frappe.msgprint(f"An error occurred: {e}")
