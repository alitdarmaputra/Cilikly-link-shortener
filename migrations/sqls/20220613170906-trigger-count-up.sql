CREATE TRIGGER link_count AFTER INSERT ON History
FOR EACH ROW 
BEGIN
    UPDATE Link_Details
    SET Click_count = Click_count + 1
    WHERE LinkId = NEW.LinkId;
END