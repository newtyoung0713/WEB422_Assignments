// pages/search.js
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

export default function AdvancedSearch() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const router = useRouter();

  const submitForm = (data) => {
    let queryString = "searchBy=true";
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;
    router.push(`/artwork?${queryString}`);
  };

  return (<>
    <Form onSubmit={handleSubmit(submitForm)}>
      <input type="hidden" {...register('searchBy')} value="true" />
      <Form.Group>
        <Form.Label>Geolocation</Form.Label>
        <Form.Control {...register('geoLocation')} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Medium</Form.Label>
        <Form.Control {...register('medium')} />
      </Form.Group>
      <Form.Group>
        <Form.Check 
          type="checkbox"
          label="On View"
          {...register('isOnView')}
        />
        <Form.Check 
          type="checkbox"
          label="Highlighted"
          {...register('isHighlight')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Search</Form.Label>
        <Form.Control
          {...register('q', { required: true })}
          className={errors.q ? "is-invalid" : ""}
        />
        {errors.q && <Form.Text className="text-danger">Search term is required</Form.Text>}
      </Form.Group>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Searching...' : 'Search'}
      </Button>
    </Form>
  </>);
}