// Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('ModbusTCPDevice', {
    // Triggered when the form is loaded or refreshed
    refresh: function(frm) {
        frm.fields_dict['tcp_table'].grid.get_field('function_code').get_query = function() {
            return {
                filters: {
                }
            };
        };
    }
});

// Script for the child table 'TCP Table'
frappe.ui.form.on('TCP Table', {
    // Trigger when the 'function_code' field changes in the child table
    function_code: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var options = []; // Initialize options array

        // Check different 'function_code' values and update 'datatype' options accordingly
        if (row.function_code === 'Read Discrete Input') {
            options = ['int', 'short int', 'unsigned int','unsigned short'];
        } else if (row.function_code === 'Read Coil Status') {
            options = ['boolean'];
        } else if (row.function_code === 'Read Holding Register' || row.function_code === 'Read Input Register') {
            options = ['int', 'long', 'unsigned int', 'unsigned long'];
        } else if (row.function_code === 'Write Single Coil') {
            options = ['boolean'];
        } else if (row.function_code === 'Write Single Register') {
            options = ['int'];
        } else if (row.function_code === 'Write Multiple Coils') {
            options = ['int', 'short int', 'unsigned int', 'unsigned short'];
        } else if (row.function_code === 'Write Multiple Registers') {
            options = ['int', 'long', 'unsigned int', 'unsigned long'];
        } else {
            options = ['boolean', 'int', 'short int', 'long', 'unsigned int', 'unsigned short', 'unsigned long', 'float32', 'float64'];
        }

        // Update the options for the 'datatype' field dynamically
        frm.fields_dict['tcp_table'].grid.update_docfield_property('datatype', 'options', options);

        // Set the first option as the default value
        frappe.model.set_value(cdt, cdn, 'datatype', options[0]);

        // Refresh the grid row to apply changes
        frm.refresh_field('tcp_table');
    }
});

