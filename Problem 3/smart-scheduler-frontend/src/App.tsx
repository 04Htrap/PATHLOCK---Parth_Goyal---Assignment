import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";

const App: React.FC = () => {
  // --- State variables ---
  const [projectId, setProjectId] = useState<string>(""); // for project ID input
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(
      {
        tasks: [
          {
            title: "Task A",
            estimatedHours: 5,
            dueDate: "2025-11-01T00:00:00",
            dependencies: [],
          },
          {
            title: "Task B",
            estimatedHours: 3,
            dueDate: "2025-11-03T00:00:00",
            dependencies: ["Task A"],
          },
        ],
      },
      null,
      2
    )
  ); // default example JSON

  const [output, setOutput] = useState<string>(""); // stores backend response
  const [loading, setLoading] = useState(false); // for spinner
  const [error, setError] = useState<string>(""); // for errors

  // --- Function: Send JSON to backend ---
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      // parse input JSON
      const parsedInput = JSON.parse(jsonInput);

      // send POST request to backend
      const response = await axios.post(`http://localhost:5018/api/v1/projects/${projectId}/schedule`, parsedInput);


      // set backend response
      setOutput(JSON.stringify(response.data, null, 2));
    } catch (err: any) {
      console.error(err);
      if (err.response) setError(err.response.data.error || "Server error");
      else setError("Invalid input or server not reachable");
    } finally {
      setLoading(false);
    }
  };

  // --- UI Layout ---
  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">Smart Scheduler API Tester</h2>

          {/* Project ID */}
          <Form.Group className="mb-3">
            <Form.Label>Project ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
          </Form.Group>

          {/* JSON Input */}
          <Form.Group className="mb-3">
            <Form.Label>Input JSON</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              style={{ fontFamily: "monospace" }}
            />
          </Form.Group>

          {/* Submit button */}
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading || !projectId}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Processing...
                </>
              ) : (
                "Generate Schedule"
              )}
            </Button>
          </div>

          {/* Error message */}
          {error && (
            <Alert variant="danger" className="mt-3">
              ❌ {error}
            </Alert>
          )}

          {/* Output JSON */}
          {output && (
            <Form.Group className="mt-4">
              <Form.Label>Response Output</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={output}
                readOnly
                style={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "monospace",
                }}
              />
            </Form.Group>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
