import { ITransaction } from "@/types";
import {
    Document,
    PDFDownloadLink,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";

// Define the data interface
interface InvoiceData {
    invoiceNumber: string;
    tnxId: string;
    paymentStatus: string;
    customer: {
        name: string;
        phone: string;
        address: string;
    };
    items: {
        type: string;
        amount: number;
    }[];
    amount: number;
    amountInWords?: string;
    company: {
        name: string;
        phone1: string;
        phone2: string;
    };
}

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        fontSize: 12,
        lineHeight: 1.6,
        backgroundColor: "#f3f4f6",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingBottom: 10,
        borderBottom: "2px solid #00A0E3",
    },
    companyName: {
        fontSize: 16,
        color: "#00A0E3",
        fontWeight: "bold",
    },
    invoiceTitle: {
        fontSize: 24,
        color: "#00A0E3",
        textAlign: "right",
        textTransform: "uppercase",
    },
    section: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 5,
    },
    bold: {
        fontWeight: "bold",
        color: "#374151",
    },
    table: {
        width: "100%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E5E7EB",
        marginTop: 10,
        backgroundColor: "#f9fafb",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#00A0E3",
        color: "#ffffff",
    },
    tableCell: {
        padding: 8,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
    },
    totalSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 5,
    },
    totalAmount: {
        fontWeight: "bold",
        color: "#00A0E3",
    },
    amountInWords: {
        marginTop: 10,
        fontStyle: "italic",
        color: "#374151",
    },
    contactInfo: {
        marginTop: 40,
        fontSize: 10,
        color: "#6b7280",
    },
});

// Define the InvoiceDocument component
const InvoiceDocument = ({ invoiceData }: { invoiceData: InvoiceData }) => (
    <Document>
        <Page style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.companyName}>
                    {invoiceData.company.name}
                </Text>
                <Text style={styles.invoiceTitle}>Invoice</Text>
            </View>

            {/* Invoice Number and Transaction ID */}
            <View style={styles.section}>
                <Text>
                    Invoice NO:{" "}
                    <Text style={styles.bold}>{invoiceData.invoiceNumber}</Text>
                </Text>
                <Text>
                    TNX ID: <Text style={styles.bold}>{invoiceData.tnxId}</Text>
                </Text>
                <Text>
                    Status:{" "}
                    <Text
                        style={[
                            styles.bold,
                            {
                                color:
                                    invoiceData.paymentStatus === "Successful"
                                        ? "#10B981"
                                        : "#EF4444",
                            },
                        ]}
                    >
                        {invoiceData.paymentStatus}
                    </Text>
                </Text>
            </View>

            {/* Customer Information */}
            <View style={styles.section}>
                <Text style={styles.bold}>Bill To:</Text>
                <Text>{invoiceData.customer.name}</Text>
                <Text>{invoiceData.customer.phone}</Text>
                <Text>{invoiceData.customer.address}</Text>
            </View>

            {/* Item Table */}
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableCell}>SL</Text>
                    <Text style={styles.tableCell}>Package Type</Text>
                    <Text style={styles.tableCell}>Amount(BDT)</Text>
                </View>
                {invoiceData.items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{index + 1}</Text>
                        <Text style={styles.tableCell}>{item.type}</Text>
                        <Text style={styles.tableCell}>{item.amount}</Text>
                    </View>
                ))}
            </View>

            {/* Total and Amount in Words */}
            <View style={styles.totalSection}>
                <Text>Total Amount: </Text>
                <Text style={styles.totalAmount}>{invoiceData.amount} BDT</Text>
            </View>

            {/* <Text style={styles.amountInWords}>
                Amount In Words: {invoiceData.amountInWords}
            </Text> */}

            {/* Company Contact Information */}
            <View style={styles.contactInfo}>
                <Text>Contact Information:</Text>
                <Text>{invoiceData.company.name}</Text>
                <Text>{invoiceData.company.phone1}</Text>
                <Text>{invoiceData.company.phone2}</Text>
            </View>
        </Page>
    </Document>
);

// Main InvoiceComponent that includes the PDF download link
const InvoiceComponent = ({ invoice }: { invoice: ITransaction }) => {
    const invoiceData: InvoiceData = {
        invoiceNumber: invoice.id,
        tnxId: invoice.transactionId,
        paymentStatus:
            invoice.paymentStatus === "Successful" ? "Successful" : "Failed",
        customer: {
            name: invoice.user.fullName,
            phone: invoice.user.phone,
            address: " ",
        },
        items: [{ type: invoice.packageName, amount: invoice.amount }],
        amount: invoice.amount,
        // amountInWords: "One Thousand Six Hundred Taka Only",
        company: {
            name: "eCommOS, Inc.",
            phone1: "+881850463208",
            phone2: "+8801616830306",
        },
    };

    return (
        <PDFDownloadLink
            document={<InvoiceDocument invoiceData={invoiceData} />}
            fileName={`invoice_${invoiceData.invoiceNumber}.pdf`}
        >
            {({ loading }) =>
                loading ? "Generating PDF..." : "Download Invoice"
            }
        </PDFDownloadLink>
    );
};

export default InvoiceComponent;
